/**
 * The EntryTypes service manages creating instances of EntryType, so go ahead and rename
 * that something that fits your app as well.
 */

import { Validators } from '@angular/forms';
import { Travel } from '../../models/travel';

export class Driving extends Travel {
  static ICON: string = 'road';
  static TYPE: string = 'driving';

  endTime: string = 'false';
  date: string = '';
  time: string = '';
  startingAddress: string = '';
  destinationAddress: string = '';

  constructor(fields?: any) {
    super(fields);
    if (fields) {
      this.patchValues(fields);
    }
  }

  static getInstance(fields?: any) {
    return new this(fields);
  }

  get address(): string {
    return this.startingAddress;
  }

  set address(value: string) {
    this.startingAddress = value;
  }

  displayText(): string {
    return this.startingAddress;
  }

  public validators(): { [key: string]: Validators } {
    return {
      date: Validators.required,
      time: Validators.required,
      startingAddress: Validators.required,
      destinationAddress: Validators.required
    };
  }

}
