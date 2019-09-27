import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, of, ReplaySubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Menu } from 'src/app/interfaces/menu/menu';
import { storage } from 'src/app/util/storage';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public menu$: ReplaySubject<Menu[]>;

  constructor(private http: HttpClient) {
    this.menu$ = new ReplaySubject(1);
    this.menu$.pipe(mergeMap(menus => storage.set('menu', menus))).subscribe();
    from(storage.get('menu'))
      .pipe(mergeMap(menus => menus ? this.usar(menus) : of(null)))
      .subscribe();
  }

  obter(): Observable<Menu[]> {
    return this.http.get<Menu[]>('assets/data/menu.json');
  }

  usar(menu: Menu[]): Observable<Menu[]> {
    this.menu$.next(menu);
    return of(menu);
  }

  async menu(): Promise<Menu> {
    return storage.get('menu');
  }
}
