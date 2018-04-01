/**
 * The EntryTypes service manages creating instances of EntryType, so go ahead and rename
 * that something that fits your app as well.
 */

import { Validators } from '@angular/forms';
import { Activity } from '../../models/activity';

export class Show extends Activity {
  static ICON: string = 'calendar';
  static TYPE: string = 'show';

  nameOfTheShow: string = '';
  date: string = '';
  address: string = '';
  startTime: string = '';
  endTime: string = '';
  description: string = '';
  confirmationId: string = '';

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

  displayText(): string {
    return this.nameOfTheShow;
  }

  public validators(): { [key: string]: Validators } {
    return {
      nameOfTheShow: Validators.required,
      date: Validators.required,
      address: Validators.required,
      startTime: Validators.required
    };
  }

}
