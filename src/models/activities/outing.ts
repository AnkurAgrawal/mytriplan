/**
 * The EntryTypes service manages creating instances of EntryType, so go ahead and rename
 * that something that fits your app as well.
 */

import { Activity } from '../../models/activity';

export class Outing extends Activity {
  static ICON: string = 'coffee';
  static NAME: string = 'outing';

  constructor(fields?: any) {
    super(fields);
  }

  static getInstance(fields?: any) {
    return new this(fields);
  }

}
