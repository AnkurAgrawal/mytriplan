/**
 * The Trips service manages creating instances of Trip, so go ahead and rename
 * that something that fits your app as well.
 */
import moment from 'moment';
import { Itinerary } from '../models/itinerary';

export type PartialTrip = Partial<Trip>;

export class Trip {

  id?: string;
  name: string;
  description: string;
  tripPic: string;
  destination: string;
  dateFrom: string;
  dateTo: string;
  itinerary: Itinerary;
  destinations: Destination[] = [];

  constructor(fields?: object);
  constructor(name: string, destination: string, dateFrom: string, dateTo: string, tripPic?: string, description?: string, itinerary?: Itinerary, destinations?: Destination[]);
  constructor(...args: (object|string|number|Itinerary|Destination[])[]) {
    if (args.length == 1 && typeof args[0] === 'object') {
      this.name = args[0]['name'] || '';
      this.description = args[0]['description'] || '';
      this.dateFrom = args[0]['dateFrom'] || '';
      this.dateTo = args[0]['dateTo'] || '';
      this.tripPic = args[0]['tripPic'] || '';
      this.destination = args[0]['destination'] || '';
      this.itinerary = args[0]['itinerary']? new Itinerary(args[0]['itinerary'] as object): new Itinerary();
      if (args[0]['destinations']) {
        (args[0]['destinations'] as Array<object>).forEach((destination) =>
          this.destinations.push(new Destination(destination['location'], destination['dateFrom'], destination['dateTo']))
        );
      }
    } else {
      this.name = args[0] as string;
      this.destination = args[1] as string || '';
      this.dateFrom = args[2] as string;
      this.dateTo = args[3] as string;
      this.tripPic = args[4] as string || 'assets/img/trips/portland-oregon.jpg';
      this.description = args[5] as string || '';
      this.itinerary = args[6] as Itinerary || new Itinerary();
      this.destinations = args[7] as Destination[] || [];
    }
  }

  getPlans(params?: any) {
    if (this.dateFrom && params.day && !params.date) {
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

  getPartial(properties: string[], includeId: boolean = true): PartialTrip {
    let partialTrip: PartialTrip = {};
    includeId && this.id && (partialTrip.id = this.id);
    properties.forEach(property => {
      if (this[property] !== undefined) {
        partialTrip[property] = this[property];
        if (property == 'itinerary') {
          partialTrip.itinerary.plans = JSON.parse(JSON.stringify(partialTrip.itinerary.plans));
        }
      }
    });

    return partialTrip;
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
