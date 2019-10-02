import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { first, map, switchMap } from 'rxjs/operators';
import { AutorizacaoService } from '../services/autorizacao.service';

@Injectable()
export class AutorizacaoInterceptor implements HttpInterceptor {

  constructor(private auth: AutorizacaoService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const urlsSemAutorizacao = ['/login'];
    const isAutoriazacao = urlsSemAutorizacao.findIndex(url => req.url.indexOf(url) !== -1);
    if (req.headers.get('Authorization') || isAutoriazacao !== -1) return next.handle(req);
    return this.auth.autorizacao$.pipe(
      first(),
      map((autorizacao) => autorizacao.token),
      switchMap((token) => {
        if (!token) return next.handle(req);
        const authReq = req.clone({setHeaders: {Authorization: token}});
        return next.handle(authReq);
      })
    );
  }
}
