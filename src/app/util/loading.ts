import { LoadingController } from '@ionic/angular';
import { from, Observable, Subscription, throwError } from 'rxjs';
import { catchError, flatMap, tap } from 'rxjs/operators';
import { Mutex } from 'src/app/util/mutex';
import { inject } from 'src/app/util/inject';

export interface LoadingContext {
  dismiss?: () => void;
  active?: boolean;
  message?: string;
  subscription?: Subscription;
}

let _loadingElement: HTMLIonLoadingElement = null;
const _loadingElementMutex = new Mutex();

const _queue: LoadingContext[] = [];
const _queueMutex = new Mutex();

const _element = (): Promise<HTMLIonLoadingElement> => {
  return _loadingElementMutex.runExclusive(() => {
    if (_loadingElement != null) return Promise.resolve(_loadingElement);
    return inject(LoadingController)
      .then((ctrl) => {
        return ctrl.create({
          cssClass: 'loading',
          spinner: 'dots'
        });
      })
      .then(loading => _loadingElement = loading)
      .then(() => _loadingElement as HTMLIonLoadingElement);
  });
};

function _loading(subOrMessage?: string | Subscription, message?: string): Promise<LoadingContext> {
  if (typeof subOrMessage === 'string') {
    message = subOrMessage;
    subOrMessage = null;
  }

  return Promise
    .resolve()
    .then(() => _element())
    .then(loading => _enqueueAndPresent(loading, message, subOrMessage as Subscription));
};

const _enqueueAndPresent = (loading: HTMLIonLoadingElement, message: string, sub: Subscription): Promise<LoadingContext> => {
  const present = _queue.length === 0;

  const ctx = {
    message,
    sub,
    active: present,
    dismiss: () => _next(loading, ctx)
  };

  _queue.push(ctx);
  if (sub) sub.add(() => ctx.dismiss());
  loading.message = message;
  if (present) {
    return loading.present().then(() => ctx);
  } else return Promise.resolve(ctx);
};

const _next = (loading: HTMLIonLoadingElement, ctx: LoadingContext) => {
  return _queueMutex.runExclusive(() => {
    if (!ctx.active) {
      const i = _queue.findIndex(c => c === ctx);
      _queue.splice(i);
      if (_queue.length === 0) {
        _loadingElement = null;
        return loading.dismiss();
      }
      return Promise.resolve(true);
    }

    const current = _queue.shift(),
          next = _queue[0],
          dismiss = !next;
    if (current) current.active = false;
    if (dismiss) {
      _loadingElement = null;
      return loading.dismiss();
    }
    if (next) {
      loading.message = next.message;
      next.active = true;
    }
    return Promise.resolve(true);
  });
};

function _observe<T>(obs: Observable<T>): Observable<T> {
  const l = _loading();
  return from(l)
    .pipe(
      flatMap(loading => {
        return obs.pipe(
          catchError(err => {
            loading.dismiss();
            return throwError(err);
          }),
          tap(() => loading.dismiss())
        );
      })
    );
}

export { _loading as loading, _observe as observe };
