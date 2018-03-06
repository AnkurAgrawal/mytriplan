/**
 * The EntryTypes service manages creating instances of EntryType, so go ahead and rename
 * that something that fits your app as well.
 */

import { Activity } from '../../models/activity';

export class Show extends Activity {
  static ICON: string = 'calendar';
  static NAME: string = 'show';

  constructor(fields?: any) {
    super(fields);
  }

  static getInstance(fields?: any) {
    return new this(fields);
  }

}
