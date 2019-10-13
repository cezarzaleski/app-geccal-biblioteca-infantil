import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { resolve } from 'src/app/util/resolve';
import { Autor } from 'src/app/interfaces/autor';


@Injectable({
  providedIn: 'root'
})
export class AutorService {
  constructor(
    private http: HttpClient,
  ) { }

  obter(id: number): Observable<Autor> {
    const url = resolve('autores/id', id);
    return this.http.get<Autor>(url);
  }

  listar(filtros?: AutorServiceFiltros, page: number = 0, count: number = 10, extras?: any):
    Observable<Autor[]> {
    const url = resolve('autores', { page, count, ...filtros });
    return this.http.get<Autor[]>(url);
  }

  cadastrar(autor: Autor): Observable<Autor> {
    const url = resolve('autores');
    return this
      .http
      .post<Autor>(url, autor);
  }

  remover(idAutor: number): Observable<Autor> {
    const url = resolve('autores/id', idAutor);
    return this
      .http
      .delete<Autor>(url);
  }

  atualizar(idAutor: number, autor: Autor): Observable<Autor> {
    const url = resolve('autores/id', idAutor);
    return this
      .http
      .put<Autor>(url, autor);
  }

  count(filtros?: AutorServiceFiltros): Observable<number> {
    const url = resolve('autores/count', {...filtros});
    return this.http.get<number>(url);
  }
}

export interface AutorServiceFiltros {
  nome?: string;
  stAtivo?: number;
}
