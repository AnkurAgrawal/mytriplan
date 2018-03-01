/**
 * The Entries service manages creating instances of Entry, so go ahead and rename
 * that something that fits your app as well.
 */

import { Entry } from '../models/entry';

export class Travel extends Entry {

  static TYPES: any[] = ['flight', 'car_rental', 'taxi', 'train', 'cruise', 'driving'];
  static icon: string = 'globe';

  constructor(fields: any) {
    super(fields);
  }

}
