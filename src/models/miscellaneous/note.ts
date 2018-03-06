/**
 * The EntryTypes service manages creating instances of EntryType, so go ahead and rename
 * that something that fits your app as well.
 */

import { Miscellaneous } from '../../models/miscellaneous';

export class Note extends Miscellaneous {
  static ICON: string = 'sticky-note';
  static NAME: string = 'note';

  constructor(fields?: any) {
    super(fields);
  }

  static getInstance(fields?: any) {
    return new this(fields);
  }

}
