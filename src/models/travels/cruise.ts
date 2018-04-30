/**
 * The EntryTypes service manages creating instances of EntryType, so go ahead and rename
 * that something that fits your app as well.
 */

import { Validators } from '@angular/forms';
import { FormValidators } from '../../providers/form-generator/form-validators';
import { Travel } from '../../models/travel';

export class Cruise extends Travel {
  static ICON: string = 'ship';
  static TYPE: string = 'cruise';

  cruiseLine: string = '';
  shipName: string = '';
  confirmationId: string = '';

  startingPort: Port = new Port();
  endingPort: Port = new Port();

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
    return this.startingPort.date;
  }

  set date(value: string) {
    this.startingPort.date = value;
  }

  get time(): string {
    return this.startingPort.time;
  }

  set time(value: string) {
    this.startingPort.time = value;
  }

  get address(): string {
    return this.startingPort.address;
  }

  set address(value: string) {
    this.startingPort.address = value;
  }

  set destinationAddress(value: string) {
    this.endingPort.address = value;
  }

  get destinationAddress(): string {
    return this.endingPort.address;
  }

  get endTime(): string {
    return this.endingPort.time;
  }

  set endTime(value: string) {
    this.endingPort.time = value;
  }

  displayText(): string {
    return this.startingPort.displayText();
  }

  public validators(): { [key: string]: Validators } {
    return {
      date: Validators.required,
      time: Validators.required,
      name: Validators.required,
      cruiseLine: Validators.required
    };
  }
}

class Port implements FormValidators {

  constructor(public date: string = '', public time: string = '', public address: string = '', public pier: string = '') { }

  displayText(): string {
    let address = this.address;
    address = (this.pier? address + ` (Pier ${this.pier})`: address);

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