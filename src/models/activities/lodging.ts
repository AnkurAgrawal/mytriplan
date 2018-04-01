/**
 * The EntryTypes service manages creating instances of EntryType, so go ahead and rename
 * that something that fits your app as well.
 */

import { Validators } from '@angular/forms';
import { FormValidators } from '../../providers/form-generator/form-validators';
import { Activity } from '../../models/activity';

export class Lodging extends Activity {
  static ICON: string = 'home';
  static TYPE: string = 'lodging';

  nameOfThePlace: string = '';
  address: string = '';
  confirmationId: string = '';
  checkIn: Appointment = new Appointment();
  checkOut: Appointment = new Appointment();
  phoneNumber: number = 0;
  email: string = '';

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
    return this.checkIn.date;
  }

  set date(value: string) {
    this.checkIn.date = value;
  }

  get time(): string {
    return this.checkIn.time;
  }

  set time(value: string) {
    this.checkIn.time = value;
  }

  displayText(): string {
    return this.nameOfThePlace;
  }

  public validators(): { [key: string]: Validators } {
    return {
      nameOfThePlace: Validators.required,
      address: Validators.required,
      phoneNumber: Validators.pattern(/^\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/)
    };
  }
}

class Appointment implements FormValidators {

  constructor(public date: string = '', public time: string = '') { }

  public validators(): { [key: string]: Validators } {
    return {
      date: Validators.required,
      time: Validators.required
    };
  }
}