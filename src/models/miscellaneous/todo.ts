/**
 * The EntryTypes service manages creating instances of EntryType, so go ahead and rename
 * that something that fits your app as well.
 */

import { Miscellaneous } from '../../models/miscellaneous';

export class Todo extends Miscellaneous {
  static ICON: string = 'list';
  static NAME: string = 'todo';

  constructor(fields?: any) {
    super(fields);
  }

  static getInstance(fields?: any) {
    return new this(fields);
  }

}
