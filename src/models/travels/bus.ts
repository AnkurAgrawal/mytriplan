/**
 * The EntryTypes service manages creating instances of EntryType, so go ahead and rename
 * that something that fits your app as well.
 */

import { Validators } from '@angular/forms';
import { FormValidators } from '../../providers/form-generator/form-validators';
import { Travel } from '../../models/travel';

export class Bus extends Travel {
  static ICON: string = 'bus';
  static TYPE: string = 'bus';

  busNumber: string = '';

  departureStop: Stop = new Stop();
  arrivalStop: Stop = new Stop();

  constructor(fields?: any) {
    super(fields);
    if (fields) {
      this.patchValues(fields);
    }
  }

  static getInstance(fields?: any) {
    return new this(fields);
  }

  get date(): string {
    return this.departureStop.date;
  }

  set date(value: string) {
    this.departureStop.date = value;
  }

  get time(): string {
    return this.departureStop.time;
  }

  set time(value: string) {
    this.departureStop.time = value;
  }

  get address(): string {
    return this.departureStop.address;
  }

  set address(value: string) {
    this.departureStop.address = value;
  }

  set destinationAddress(value: string) {
    this.arrivalStop.address = value;
  }

  get destinationAddress(): string {
    return this.arrivalStop.address;
  }

  get endTime(): string {
    return this.arrivalStop.time;
  }

  set endTime(value: string) {
    this.arrivalStop.time = value;
  }

  displayText(): string {
    return this.departureStop.displayText();
  }

  public validators(): { [key: string]: Validators } {
    return {
      busNumber: Validators.required
    };
  }

}

class Stop implements FormValidators {

  constructor(public date: string = '', public time: string = '', public address: string = '') { }

  displayText(): string {
    return this.address;
  }

  public validators(): { [key: string]: Validators } {
    return {
      date: Validators.required,
      time: Validators.required,
      address: Validators.required
    };
  }
}
