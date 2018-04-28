/**
 * The EntryTypes service manages creating instances of EntryType, so go ahead and rename
 * that something that fits your app as well.
 */

import { Validators } from '@angular/forms';
import { FormValidators } from '../../providers/form-generator/form-validators';
import { Travel } from '../../models/travel';

export class Flight extends Travel {
  static ICON: string = 'plane';
  static TYPE: string = 'flight';

  airline: string = '';
  flightNumber: string = '';
  confirmationId: string = '';

  departureAirport: Airport = new Airport();
  arrivalAirport: Airport = new Airport();

  constructor(fields?: any) {
    super(fields);
    if (fields) {
      this.patchValues(fields);
    }
  }

  static getInstance(fields?: any) {
    return new Flight(fields);
  }

  get date(): string {
    return this.departureAirport.date;
  }

  set date(value: string) {
    this.departureAirport.date = value;
  }

  get time(): string {
    return this.departureAirport.time;
  }

  set time(value: string) {
    this.departureAirport.time = value;
  }

  get address(): string {
    return this.departureAirport.address;
  }

  set address(value: string) {
    this.departureAirport.address = value;
  }

  get endTime(): string {
    return this.arrivalAirport.time;
  }

  set endTime(value: string) {
    this.arrivalAirport.time = value;
  }

  displayText(): string {
    return this.departureAirport.displayText();
  }

  public validators(): { [key: string]: Validators } {
    return { };
  }

}

class Airport implements FormValidators {

  constructor(public date: string = '', public time: string = '', public address: string = '', public terminal: string = '', public gate: string = '') { }

  displayText(): string {
    let address = this.address;
    address = (this.terminal? address + ` (${this.terminal}`: address);
    address = (this.terminal && this.gate? address + `, Gate ${this.gate}`: address);
    address = (this.terminal? address + ')': address);

    return address;
  }

  get name(): string {
    return this.address;
  }

  set name(value: string) {
    this.address = value;
  }

  public validators(): { [key: string]: Validators } {
    return {
      date: Validators.required,
      time: Validators.required,
      address: Validators.required
    };
  }

}