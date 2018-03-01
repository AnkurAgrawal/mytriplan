/**
 * The Activities service manages creating instances of Activity, so go ahead and rename
 * that something that fits your app as well.
 */

import { Entry } from '../models/entry';

export class Activity extends Entry {

  static TYPES: any[] = ['lodging', 'meeting', 'restaurant', 'outing', 'show', 'shopping'];
  static icon: string = 'calendar';

  constructor(fields: any) {
    super(fields);
  }

}
