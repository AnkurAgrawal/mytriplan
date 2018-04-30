/**
 * The Plans service manages creating instances of Plan, so go ahead and rename
 * that something that fits your app as well.
 */

import { Plan } from '../models/plan';

export abstract class Miscellaneous extends Plan {
  static ICON: string = 'suitcase';
  static ICON_COLOR: string = 'crimson';
  static GROUP: string = 'miscellaneous';
  static TYPE: string;

  constructor(fields?: any) {
    super(fields);
  }

}
