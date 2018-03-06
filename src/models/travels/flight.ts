/**
 * The EntryTypes service manages creating instances of EntryType, so go ahead and rename
 * that something that fits your app as well.
 */

import { Travel } from '../../models/travel';

export class Flight extends Travel {
  static ICON: string = 'plane';
  static NAME: string = 'flight';

  airline: string = '';
  flightNumber: string = '';
  confirmationId: string = '';

  departureAirport: Airport = new Airport();
  arrivalAirport: Airport = new Airport();

  constructor(fields?: any) {
    super(fields);
  }

  static getInstance(fields?: any) {
    return new this(fields);
  }

}

class Airport {

  constructor(public city: string = '', public name: string = '', public terminal: string = '', public gate: string = '') {
    ;
  }
}