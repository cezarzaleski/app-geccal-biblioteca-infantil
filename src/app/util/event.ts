import { inject } from 'src/app/util/inject';
import { from, Observable } from 'rxjs';
import { Events } from '@ionic/angular';
import { flatMap } from 'rxjs/operators';

const publish = (name: string, ...args: any[]) => {
  return inject(Events).then(ev => ev.publish(name, ...args));
};

const on = (name: string): Observable<any> => {
  return from(inject(Events))
    .pipe(
      flatMap(ev => {
        return new Observable((observer) => {
          ev.subscribe(name, (...args: any[]) => {
            observer.next(...args);
          });
        });
      })
    );
};

const events = { publish, on };
export { events };

