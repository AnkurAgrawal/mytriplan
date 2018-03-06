/**
 * The EntryTypes service manages creating instances of EntryType, so go ahead and rename
 * that something that fits your app as well.
 */

import { Travel } from '../../models/travel';

export class Cruise extends Travel {
  static ICON: string = 'ship';
  static NAME: string = 'cruise';

  constructor(fields?: any) {
    super(fields);
  }

  static getInstance(fields?: any) {
    return new this(fields);
  }

}
