import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { resolve } from 'src/app/util/resolve';
import { Livro } from 'src/app/interfaces/livro';


@Injectable({
  providedIn: 'root'
})
export class LivroService {
  constructor(
    private http: HttpClient,
  ) { }

  obter(id: number): Observable<Livro> {
    const url = resolve('livros/id', id);
    return this.http.get<Livro>(url);
  }

  listar(filtros?: LivroServiceFiltros, page: number = 0, count: number = 10, extras?: any):
    Observable<Livro[]> {
    const url = resolve('livros', { page, count, ...filtros });
    return this.http.get<Livro[]>(url);
  }

  cadastrar(livro: Livro): Observable<Livro> {
    const url = resolve('livros');
    return this
      .http
      .post<Livro>(url, livro);
  }

  remover(idLivro: number): Observable<Livro> {
    const url = resolve('livros/id', idLivro);
    return this
      .http
      .delete<Livro>(url);
  }

  atualizar(idLivro: number, livro: Livro): Observable<Livro> {
    const url = resolve('livros/id', idLivro);
    return this
      .http
      .put<Livro>(url, livro);
  }

  count(filtros?: LivroServiceFiltros): Observable<number> {
    const url = resolve('livros/count', {...filtros});
    return this.http.get<number>(url);
  }
}

export interface LivroServiceFiltros {
  nome?: string;
  stAtivo?: number;
}
