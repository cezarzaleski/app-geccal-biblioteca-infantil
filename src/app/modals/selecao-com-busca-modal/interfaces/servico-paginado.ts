import { Observable } from 'rxjs';

export interface ServicoPaginado<T> {
  listar(termos?: any, page?: number, size?: number, extras?: any): Observable<T[]>;
}
