import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Editora } from 'src/app/interfaces/editora';
import { resolve } from 'src/app/util/resolve';


@Injectable({
  providedIn: 'root'
})
export class EditoraService {
  constructor(
    private http: HttpClient,
  ) { }

  obter(id: number): Observable<Editora> {
    const url = resolve('editoras/id', id);
    return this.http.get<Editora>(url);
  }

  listar(filtros?: EditoraServiceFiltros, page: number = 0, count: number = 10, extras?: any):
    Observable<Editora[]> {
    const url = resolve('editoras', { page, count, ...filtros });
    return this.http.get<Editora[]>(url);
  }

  cadastrar(editora: Editora): Observable<Editora> {
    const url = resolve('editoras');
    return this
      .http
      .post<Editora>(url, editora);
  }

  remover(idEditora: number): Observable<Editora> {
    const url = resolve('editoras/id', idEditora);
    return this
      .http
      .delete<Editora>(url);
  }

  atualizar(idEditora: number, editora: Editora): Observable<Editora> {
    const url = resolve('editoras/id', idEditora);
    return this
      .http
      .put<Editora>(url, editora);
  }
}

export interface EditoraServiceFiltros {
  nome?: string;
}
