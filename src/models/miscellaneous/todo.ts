/**
 * The EntryTypes service manages creating instances of EntryType, so go ahead and rename
 * that something that fits your app as well.
 */

import { Validators } from '@angular/forms';
import { Miscellaneous } from '../../models/miscellaneous';

export class Todo extends Miscellaneous {
  static ICON: string = 'list';
  static TYPE: string = 'todo';

  date: string = '';
  time: string = '';
  address: string = '';
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

  displayText(): string {
    return this.description;
  }

  public validators(): { [key: string]: Validators } {
    return {
      name: Validators.required,
      date: Validators.required,
      description: Validators.required
    };
  }

}
