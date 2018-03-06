/**
 * The EntryTypes service manages creating instances of EntryType, so go ahead and rename
 * that something that fits your app as well.
 */

import { Travel } from '../../models/travel';

export class Taxi extends Travel {
  static ICON: string = 'taxi';
  static NAME: string = 'taxi';

  constructor(fields?: any) {
    super(fields);
  }

  static getInstance(fields?: any) {
    return new this(fields);
  }

}
