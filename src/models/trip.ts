/**
 * The Trips service manages creating instances of Trip, so go ahead and rename
 * that something that fits your app as well.
 */

import { Itinerary } from '../models/itinerary';

export class Trip {

  name: string;
  description: string;
  tripPic: string;
  dateFrom: string;
  dateTo: string;
  itinerary: Itinerary;

  constructor(fields: any) {
    // Quick and dirty extend/assign fields to this model
    for (const f in fields) {
      if (f == 'itinerary') {
        this.itinerary = new Itinerary(fields[f]);
      } else {
        this[f] = fields[f];
      }
    }
  }

}
