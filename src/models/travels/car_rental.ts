/**
 * The EntryTypes service manages creating instances of EntryType, so go ahead and rename
 * that something that fits your app as well.
 */

import { Validators } from '@angular/forms';
import { FormValidators } from '../../providers/form-generator/form-validators';
import { Travel } from '../../models/travel';

export class CarRental extends Travel {
  static ICON: string = 'car';
  static TYPE: string = 'car-rental';

  company: string = '';
  phoneNumber: string = '';
  confirmationId: string = '';
  car: Car = new Car();

  pickUp: Appointment = new Appointment();
  dropOff: Appointment = new Appointment();

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
    return this.pickUp.date;
  }

  set date(value: string) {
    this.pickUp.date = value;
  }

  get time(): string {
    return this.pickUp.time;
  }

  set time(value: string) {
    this.pickUp.time = value;
  }

  get address(): string {
    return this.pickUp.address;
  }

  set address(value: string) {
    this.pickUp.address = value;
  }

  get endTime(): string {
    return this.dropOff.time;
  }

  set endTime(value: string) {
    this.dropOff.time = value;
  }

  displayText(): string {
    return this.pickUp.displayText();
  }

  public validators(): { [key: string]: Validators } {
    return {
      company: Validators.required,
      phoneNumber: Validators.pattern(/^\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/)
    };
  }
}

class Appointment implements FormValidators {

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
class Car {

  constructor(public type: string = '', public make: string = '', public model: string = '') { }

}