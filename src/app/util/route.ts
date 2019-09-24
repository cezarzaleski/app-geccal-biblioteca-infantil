/**
 * Util que facilita acessar parametros, data, etc, em toda a árvore de rota.
 * Retorna ao encontrar na rota pai o primeiro parametro que deu match.
 *
 * Exemplo:
 * ```
 * import { access } from 'core/util/route'
 * constructor(route: Activatedroute) {
 *   console.log(access(route).param('id'))
 * }
 */
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

class RouteAccessor {
  snapshot: ActivatedRouteSnapshot;

  constructor(route: ActivatedRouteSnapshot | ActivatedRoute) {
    if (route instanceof ActivatedRoute) {
      this.snapshot = route.snapshot;
    } else {
      this.snapshot = route;
    }
  }

  /**
   * Atravessa a lista de rotas pais (incluindo a atual) e chama a função
   * acessora. Caso a função retorne o dado, esse dado é retornado por essa
   * função. Caso contrário, continua buscando nas rotas pais e retorna undefined
   * caso nada seja encontrado.
   * @param access Função de visita em cada nó da rota pai, responsável por encontrar o dado
   */
  traverse(access: (snapshot: ActivatedRouteSnapshot) => any): any {
    for (let snapshot = this.snapshot; snapshot; snapshot = snapshot.parent) {
      const data = access(snapshot);
      if (data) {
        return data;
      }
    }
    return undefined;
  }

  /**
   * Encontra na rota atual ou em todas as rotas pais o parâmetro de nome especificado
   * por `key`
   * @param key A chave do parametro para obter
   */
  param(key: string) { return this.traverse(snapshot => snapshot.params[key]); }

  /**
   * Encontra na rota atual ou em todas as rotas pais o dado de nome especificado por `key`
   * @param key A chave do data para obter
   */
  data(key: string) { return this.traverse(snapshot => snapshot.data[key]); }
}

const accessfn = (route: ActivatedRouteSnapshot | ActivatedRoute): RouteAccessor => {
  return new RouteAccessor(route);
};

export { accessfn as access };
