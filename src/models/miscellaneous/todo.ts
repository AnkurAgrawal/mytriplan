/**
 * The EntryTypes service manages creating instances of EntryType, so go ahead and rename
 * that something that fits your app as well.
 */

import { Validators } from '@angular/forms';
import { Miscellaneous } from '../../models/miscellaneous';

export class Todo extends Miscellaneous {
  static ICON: string = 'list-ol';
  static TYPE: string = 'todo';

  date: string = '';
  time: string = '';
  address: string = '';

  constructor(fields?: any) {
    super(fields);
    if (fields) {
      this.patchValues(fields);
    }
  }

  static getInstance(fields?: any) {
    return new this(fields);
  }

  set endTime(value: string) { }

  get endTime(): string {
    return 'false';
  }

  displayText(): string {
    return this.note;
  }

  public validators(): { [key: string]: Validators } {
    return {
      name: Validators.required,
      date: Validators.required,
      note: Validators.required
    };
  }

}
