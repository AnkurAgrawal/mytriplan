/**
 * The Entries service manages creating instances of Entry, so go ahead and rename
 * that something that fits your app as well.
 */

import { Entry } from '../models/entry';

export class Miscellaneous extends Entry {

  static TYPES: any[] = ['notes', 'todo'];
  static icon: string = 'suitcase';

  constructor(fields: any) {
    super(fields);
  }

}
