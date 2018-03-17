/**
 * The EntryTypes service manages creating instances of EntryType, so go ahead and rename
 * that something that fits your app as well.
 */

import { Validators } from '@angular/forms';
import { Miscellaneous } from '../../models/miscellaneous';

export class Note extends Miscellaneous {
  static ICON: string = 'sticky-note';
  static NAME: string = 'note';

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

  get date(): string { return ''; }
  set date(value: string) { }
  get time(): string { return ''; }
  set time(value: string) { }

  public validators(): { [key: string]: Validators } {
    return {
      description: Validators.required
    };
  }

}
