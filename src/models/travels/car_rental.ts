/**
 * The EntryTypes service manages creating instances of EntryType, so go ahead and rename
 * that something that fits your app as well.
 */

import { Travel } from '../../models/travel';

export class CarRental extends Travel {
  static ICON: string = 'car';
  static NAME: string = 'car-rental';

  company: string = '';
  confirmationId: string = '';

  dropOff: any = {
    date: '',
    time: ''
  }

  constructor(fields?: any) {
    super(fields);
  }

  static getInstance(fields?: any) {
    return new this(fields);
  }

}
