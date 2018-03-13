import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Api } from '../api/api';

/*
  Generated class for the AirportsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AirportsProvider {

  constructor(public http: Http, public api: Api) {
    console.log('Hello AirportsProvider Provider');
  }

  query(params?: any) {
    return this.api.get('/airports', params)
      .map(resp => resp.json());
  }

}
