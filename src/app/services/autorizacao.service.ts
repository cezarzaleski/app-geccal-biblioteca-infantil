import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, of, ReplaySubject, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Usuario } from 'src/app/interfaces/usuario';
import { storage } from 'src/app/util/storage';
import { resolve } from 'src/app/util/resolve';

@Injectable({
  providedIn: 'root'
})
export class AutorizacaoService {
  public autorizacao$: ReplaySubject<Usuario>;

  constructor(private http: HttpClient) {
    this.autorizacao$ = new ReplaySubject(1);
    this.autorizacao$.pipe(mergeMap(autorizacao => storage.set('autorizacao', autorizacao))).subscribe();
    from(storage.get('autorizacao'))
      .pipe(mergeMap(autorizacao => autorizacao ? this.usar(autorizacao) : of(null)))
      .subscribe();
  }

  obter(noUsuario: string, noSenha: string): Observable<any> {
    const url = resolve('login');
    return this
      .http
      .post<any>(url, {
        noUsuario,
        noSenha
      }, {observe: 'response'})
      .pipe(catchError(err => {
        if (err.status === 401) {
          return throwError(new Error('Não foi possível autenticar-se usando as credenciais fornecidas.'));
        } else {
          return throwError(new Error('Não foi possível autenticar-se. Verifique sua conexão e tente novamente mais tarde.'));
        }
      })).pipe(
        map((response) => {
            const token = response.headers.get('Authorization');
            return response;
        })
      );
  }
  usar(autorizacao: Usuario): Observable<Usuario> {
    this.autorizacao$.next(autorizacao);
    return of(autorizacao);
  }

  async autorizacao(): Promise<Usuario> {
    return storage.get('autorizacao');
  }
}
