import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { from, Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { Menu } from 'src/app/interfaces/menu/menu';
import { MenuService } from 'src/app/services/menu.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { observe } from 'src/app/util/loading';

@Injectable({
  providedIn: 'root'
})
export class MenuResolverService implements Resolve<Menu[]> {

  constructor(private menuService: MenuService, private usuarioService: UsuarioService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Menu[]> {
    const menu = from(this.usuarioService.usuario())
      .pipe(
        flatMap((usuario) => this.menuService.obter())
      );
    return observe(menu);
  }
}
