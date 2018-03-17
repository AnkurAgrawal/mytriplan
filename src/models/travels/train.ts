/**
 * The EntryTypes service manages creating instances of EntryType, so go ahead and rename
 * that something that fits your app as well.
 */

import { Validators } from '@angular/forms';
import { FormValidators } from '../../providers/form-generator/form-validators';
import { Travel } from '../../models/travel';

export class Train extends Travel {
  static ICON: string = 'train';
  static NAME: string = 'train';

  carrier: string = '';
  confirmationId: string = '';

  departureStation: Station = new Station();
  arrivalStation: Station = new Station();

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
    return this.departureStation.date;
  }

  set date(value: string) {
    this.departureStation.date = value;
  }

  get time(): string {
    return this.departureStation.time;
  }

  set time(value: string) {
    this.departureStation.time = value;
  }

  get address(): string {
    return this.departureStation.address;
  }

  set address(value: string) {
    this.departureStation.address = value;
  }

  public validators(): { [key: string]: Validators } {
    return {
      carrier: Validators.required
    };
  }

}

class Station implements FormValidators {

  constructor(public date: string = '', public time: string = '', public address: string = '', public platform: string = '') { }

  get address1(): string {
    let address = this.address;
    address = (this.platform? address + ' (Platform ${this.platform}': address);

    return address;
  }

  public validators(): { [key: string]: Validators } {
    return {
      date: Validators.required,
      time: Validators.required,
      address: Validators.required
    };
  }
}
