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
  destination: string;
  dateFrom: string;
  dateTo: string;
  itinerary: Itinerary;
  destinations: Destination[] = [];

  constructor(fields?: any) {
    // Quick and dirty extend/assign fields to this model
    for (const f in fields) {
      if (f == 'itinerary') {
        this.itinerary = new Itinerary(fields[f]);
      } else if (f == 'destinations') {
        fields[f].forEach((destination) =>
          this.destinations.push(new Destination(destination.location, destination.dateFrom, destination.dateTo))
        );
      } else {
        this[f] = fields[f];
      }
    }
    if (this.itinerary == undefined) {
      this.itinerary = new Itinerary();
    }
    if (this.destinations == undefined || this.destinations.length == 0) {
      this.destinations.push(new Destination('', '', ''));
    }
  }

  getPlans(params?: any) {
    if (this.dateFrom && params) {
      params.dateFrom = this.dateFrom;
    }
    return this.itinerary.getPlans(params);
  }

  updatePlan(newPlan, oldPlan) {
    this.itinerary.updatePlan(newPlan, oldPlan);
  }

  deletePlan(plan) {
    this.itinerary.deletePlan(plan);
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
      tripDates.push(moment(this.dateFrom).add(_i, 'days').format('YYYY-MM-DD'));
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

class Destination {

  constructor(public location: string, public dateFrom: string, public dateTo: string) { }
}
