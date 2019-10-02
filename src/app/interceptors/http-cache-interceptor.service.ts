// tslint:disable:no-console

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { flatMap, shareReplay, tap } from 'rxjs/operators';
import { HttpCacheService } from 'src/app/services/http-cache.service';

@Injectable({
  providedIn: 'root'
})
export class HttpCacheInterceptorService
  implements HttpInterceptor {
  requests: {
    [k: string]: Observable<any>
  } = {};

  constructor(private cache: HttpCacheService) { console.log('hello cache'); }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method !== 'GET') {
      return next.handle(req);
    }
    const xMaxAge = (req.headers.get('x-max-age') || '').toString();
    let maxAge = 10 * 1000;
    if (xMaxAge === '0') {
      return next.handle(req);
    }
    if (xMaxAge.startsWith('inf')) {
      maxAge = -1;
    }
    if (xMaxAge !== '') {
      maxAge = parseInt(xMaxAge, 10);
    }

    return this
      .cache
      .get(req)
      .pipe(
        flatMap((cached: HttpResponse<any>) => {
          if (cached) {
            // tslint:disable-next-line:no-console
            console.debug('[http-cache] cache de', req.urlWithParams, 'encontrado');
            return of(cached);
          } else {
            return this.dispatch(req, next, maxAge);
          }
        })
      );
  }

  dispatch(req: HttpRequest<any>, next: HttpHandler, maxAge: number): Observable<HttpEvent<any>> {
    const k = req.urlWithParams;
    if (this.requests[k]) {
      console.debug(`[http-cache] %congoing ${k}`, 'color: #FFCA08');
      return this.requests[k];
    }

    this.requests[k] = next
      .handle(req)
      .pipe(
        tap((response: HttpEvent<any>) => {
          if (response instanceof HttpResponse) {
            console.debug(`[http-cache] %cfinished ${k}`, 'color: #008140');
            this.requests[k] = null;
            if (response.ok && response.headers.get('content-type') && response.headers.get('content-type').toLowerCase().indexOf('json') > -1) {
              this
                .cache
                .set(req, response, maxAge)
                .subscribe(() => console.debug(`[http-cache] %ccaching ${k} for ${maxAge} ms`, 'color: #008140'));
            }
          }
        }),
        shareReplay()
      );

    return this.requests[k];
  }
}
