/**
 * The Activities service manages creating instances of Activity, so go ahead and rename
 * that something that fits your app as well.
 */

import { Plan } from '../models/plan';

export abstract class Activity extends Plan {
  static ICON: string = 'calendar';
  static GROUP: string = 'Activity';
  static NAME: string;

  constructor(fields?: any) {
    super(fields);
  }
}
