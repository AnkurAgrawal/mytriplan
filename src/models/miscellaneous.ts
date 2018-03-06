/**
 * The Plans service manages creating instances of Plan, so go ahead and rename
 * that something that fits your app as well.
 */

import { Plan } from '../models/plan';

export abstract class Miscellaneous extends Plan {
  static ICON: string = 'suitcase';
  static GROUP: string = 'Miscellaneous';
  static NAME: string;

  constructor(fields?: any) {
    super(fields);
  }

}
