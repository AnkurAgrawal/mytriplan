import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Trip } from '../../models/trip';
import { Api } from '../api/api';

@Injectable()
export class Trips {

  constructor(public http: Http, public api: Api) {
  }

  query(params?: any) {
    return this.api.get('/trips', params)
      .map(resp => resp.json());
  }

  queryItinerary(params?: any) {
    return this.api.get('/trips/itinerary', params)
      .map(resp => resp.json());
  }

  add(trip: Trip) {
  }

  delete(trip: Trip) {
  }

}
