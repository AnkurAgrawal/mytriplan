/**
 * The EntryTypes service manages creating instances of EntryType, so go ahead and rename
 * that something that fits your app as well.
 */

import { Validators } from '@angular/forms';
import { Miscellaneous } from '../../models/miscellaneous';

export class Note extends Miscellaneous {
  static ICON: string = 'sticky-note';
  static TYPE: string = 'note';

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
      note: Validators.required
    };
  }

}
