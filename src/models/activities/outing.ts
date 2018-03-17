/**
 * The EntryTypes service manages creating instances of EntryType, so go ahead and rename
 * that something that fits your app as well.
 */

import { Validators } from '@angular/forms';
import { Activity } from '../../models/activity';

export class Outing extends Activity {
  static ICON: string = 'coffee';
  static NAME: string = 'outing';

  nameOfThePlace: string = '';
  date: string = '';
  address: string = '';
  startTime: string = '';
  endTime: string = '';
  description: string = '';

  constructor(fields?: any) {
    super(fields);
    if (fields) {
      this.patchValues(fields);
    }
  }

  static getInstance(fields?: any) {
    return new this(fields);
  }

  get time(): string {
    return this.startTime;
  }

  set time(value: string) {
    this.startTime = value;
  }

  public validators(): { [key: string]: Validators } {
    return {
      nameOfThePlace: Validators.required,
      date: Validators.required,
      address: Validators.required,
      startTime: Validators.required
    };
  }

}
