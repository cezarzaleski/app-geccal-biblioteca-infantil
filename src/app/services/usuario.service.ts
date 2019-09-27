import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, of, ReplaySubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { storage } from 'src/app/util/storage';
import { Usuario } from 'src/app/interfaces/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public usuario$: ReplaySubject<Usuario>;

  constructor(
    public http: HttpClient,
  ) {
    this.usuario$ = new ReplaySubject(1);
    this.usuario$.pipe(mergeMap(token => storage.set('usuario', token))).subscribe();

    from(storage.get('usuario'))
      .pipe(mergeMap(usuario => usuario ? this.usar(usuario) : of(null)))
      .subscribe();
  }

  usar(usuario: Usuario): Observable<Usuario> {
    this.usuario$.next(usuario);
    return of(usuario);
  }

  async usuario(): Promise<Usuario> {
    return storage.get('usuario');
  }
}
