
import { Travel } from '../models/travel';
import { Activity } from '../models/activity';
import { Miscellaneous } from '../models/miscellaneous';

/**
 * The Entries service manages creating instances of Entry, so go ahead and rename
 * that something that fits your app as well.
 */
export class Entry {
  static TYPES: string[] = ['travel', 'activity', 'miscellaneous'];
  static icon: string = 'pencil';

  private _name: string;

  constructor(fields: any) {
    // Quick and dirty extend/assign fields to this model
    for (const f in fields) {
      this[f] = fields[f];
    }
  }

  setName(name: string) {
    this._name = name;
  }

  getName() {
    return this._name;
  }

}
