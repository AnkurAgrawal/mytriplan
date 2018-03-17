/**
 * The EntryTypes service manages creating instances of EntryType, so go ahead and rename
 * that something that fits your app as well.
 */

import { Validators } from '@angular/forms';
import { Miscellaneous } from '../../models/miscellaneous';

export class Todo extends Miscellaneous {
  static ICON: string = 'list';
  static NAME: string = 'todo';

  date: string = '';
  time: string = '';
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

  get address(): string {
    return this.description;
  }

  set address(value: string) {
    this.description = value;
  }

  public validators(): { [key: string]: Validators } {
    return {
      name: Validators.required,
      date: Validators.required,
      description: Validators.required
    };
  }

}
