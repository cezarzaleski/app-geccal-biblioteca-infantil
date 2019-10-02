// tslint:disable:no-console
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { Storage } from '@ionic/storage';
import { flatMap, map, mapTo } from 'rxjs/operators';
import { NavigationStart, Router } from '@angular/router';

export interface ResponseData {
  body?: any;
  headers?: { [k: string]: any | any[] } | HttpHeaders;
  status?: number;
  statusText?: string;
  url?: string;
  expires?: number;
}

@Injectable({
  providedIn: 'root'
})
export class HttpCacheService {
  enabled: boolean;

  constructor(private storage: Storage, private router: Router) {
    this.router.events.subscribe(ev => {
      if (ev instanceof NavigationStart) {
        this.enable();
      }
    });
    this.enabled = true;
    window['cache'] = this;
  }

  public enable() {
    this.enabled = true;
  }

  public disable() {
    this.enabled = false;
  }

  public set(request: HttpRequest<any>, response: HttpResponse<any>, maxAge: number = 300000): Observable<HttpResponse<any>> {
    if (!this.enabled) {
      return of(response);
    }
    const k = `cache/${request.urlWithParams}`;
    const h = response.headers.keys().reduce((headers, key) => {
      headers[key] = response.headers.getAll(key);
      return headers;
    }, {} as any);

    const data: ResponseData = {
      body: JSON.parse(JSON.stringify(response.body)),
      headers: h,
      status: response.status,
      statusText: response.statusText,
      url: response.url,
      expires: maxAge > 0 ? Date.now() + maxAge : -1
    };
    return from(this.storage.set(k, data)).pipe(map(() => {
      data.headers = new HttpHeaders(data.headers as any);
      return new HttpResponse(data as any);
    }));
  }

  public get(request: HttpRequest<any>): Observable<HttpResponse<any>> {
    if (!this.enabled) {
      return of(undefined);
    }
    const url = request.urlWithParams;
    const k = `cache/${url}`;
    const expired = (data: ResponseData) => {
      return data.expires > 0 ? (data.expires - Date.now()) < 0 : false;
    };

    return from(this.storage.get(k))
      .pipe(
        flatMap(data => {
          if (!data) {
            return of(undefined);
          }
          if (expired(data)) {
            console.debug(`[http-cache] %cexpired ${url}`, 'color: red');
            return this.expire(k).pipe(mapTo(undefined));
          } else {
            return of(new HttpResponse(data));
          }
        })
      );
  }

  public clear(): Observable<any> {
    return from(this
      .storage
      .keys()
      .then((keys: string[]) => keys.filter(key => key.startsWith('cache/')))
      .then((keys: string[]) => Promise.all(keys.map(key => this.storage.remove(key)))));
  }

  public expire(k: string): Observable<void> {
    return from(this.storage.remove(k));
  }
}
