/**
 * The Trips service manages creating instances of Trip, so go ahead and rename
 * that something that fits your app as well.
 */
import moment from 'moment';

import { Itinerary } from '../models/itinerary';

export class Trip {

  name: string;
  description: string;
  tripPic: string;
  dateFrom: string;
  dateTo: string;
  itinerary: Itinerary;

  constructor(fields?: any) {
    // Quick and dirty extend/assign fields to this model
    for (const f in fields) {
      if (f == 'itinerary') {
        this.itinerary = new Itinerary(fields[f]);
      } else {
        this[f] = fields[f];
      }
    }
    if (this.itinerary == undefined) {
      this.itinerary = new Itinerary();
    }
  }

  getPlans(params?: any) {
    if (this.dateFrom && params) {
      params.dateFrom = this.dateFrom;
    }
    return this.itinerary.getPlans(params);
  }

  updatePlan(newPlan, oldPlan) {
    // TODO Update the old plan with the new one
  }

  get length(): number {
    if (this.dateFrom && this.dateTo) {
      return 1 + moment(this.dateTo).diff(moment(this.dateFrom), 'days');
    }

    // console.error('Dates for the trip ' + this.name + ' is not defined yet.');
    return undefined;
  }

  get dates(): any[] {
    let tripDates: any[] = [];
    if (this.length == undefined) {
      // console.error('Dates for the trip ' + this.name + ' is not defined yet.');
      return tripDates;
    }
    for (var _i = 0; _i < this.length; _i++) {
      tripDates.push(moment(this.dateFrom).add(_i, 'days'));
    }
    return tripDates;
  }

  get daysLeft(): number {
    if (this.dateFrom) {
      return 1 + moment(this.dateFrom).diff(moment(new Date()), 'days');
    }
    // console.error('Starting date for the trip ' + this.name + ' is not defined yet.');
    return undefined;
  }

}
