/**
 * The Plans service manages creating instances of Plan, so go ahead and rename
 * that something that fits your app as well.
 */

import { Plan } from '../models/plan';

export abstract class Travel extends Plan {
  static ICON: string = 'globe';
  static ICON_COLOR: string = 'coral';
  static GROUP: string = 'travel';
  static TYPE: string;

  constructor(fields?: any) {
    super(fields);
  }

  abstract set destinationAddress(value: string);
  abstract get destinationAddress(): string;

}
