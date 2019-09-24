
type MutexReleaser = () => void;
type MutexWorker<T> = () => Promise<T>|T;

export class Mutex {

  private _queue: Array<(release: MutexReleaser) => void> = [];
  private _pending = false;

  isLocked(): boolean {
    return this._pending;
  }

  acquire(): Promise<MutexReleaser> {
    const ticket = new Promise<MutexReleaser>(resolve => this._queue.push(resolve));

    if (!this._pending) {
      this._dispatchNext();
    }

    return ticket;
  }

  runExclusive<T>(callback: MutexWorker<T>): Promise<T> {
    return this
      .acquire()
      .then(release => {
          let result: T|Promise<T>;

          try {
            result = callback();
          } catch (e) {
            release();
            throw(e);
          }

          return Promise
            .resolve(result)
            .then(
              (x: T) => (release(), x),
              e => {
                release();
                throw e;
              }
            );
        }
      );
  }

  private _dispatchNext(): void {
    if (this._queue.length > 0) {
      this._pending = true;
      // tslint:disable-next-line:no-non-null-assertion
      this._queue.shift()!(this._dispatchNext.bind(this));
    } else {
      this._pending = false;
    }
  }
}
