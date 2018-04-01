import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = 'https://mytriplan.com/api/v1';

  constructor(public http: HttpClient) {
  }

  get(endpoint: string, params?: any, httpOptions?: object) {
    if (!httpOptions) {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          // 'Authorization': 'my-auth-token'
        })
      };
    }

    // Support easy query params for GET requests
    if (params) {
      let p = new HttpParams();
      for (let k in params) {
        p.set(k, params[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in httpOptions.
      httpOptions['params'] = !httpOptions['params'] && p || httpOptions['params'];
    }

    return this.http.get(this.url + '/' + endpoint, httpOptions);
  }

  post<T>(endpoint: string, data: T, httpOptions?: object) {
    return this.http.post(this.url + '/' + endpoint, data, httpOptions);
  }

  put<T>(endpoint: string, data: T, httpOptions?: object) {
    return this.http.put(this.url + '/' + endpoint, data, httpOptions);
  }

  delete(endpoint: string, httpOptions?: object) {
    return this.http.delete(this.url + '/' + endpoint, httpOptions);
  }

  patch<T>(endpoint: string, data: T, httpOptions?: object) {
    return this.http.put(this.url + '/' + endpoint, data, httpOptions);
  }
}
