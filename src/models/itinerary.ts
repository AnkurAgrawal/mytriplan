/**
 * The Itineraries service manages creating instances of Itinerary, so go ahead and rename
 * that something that fits your app as well.
 */

import { Entry } from '../models/entry';
import { Travel } from '../models/travel';
import { Activity } from '../models/activity';
import { Miscellaneous } from '../models/miscellaneous';

export class Itinerary {

  private _entries: Entry[] = [];

  constructor(entries: any) {
    // Quick and dirty extend/assign _entries to this model
    if (entries != undefined) {
      for (let f in entries) {
        this.addEntry(entries[f]);
      }
    }
  }

  addEntry(_entry) {
    // this._entries.push(Entry.getObject(_entry));
    if (Travel.TYPES.indexOf(_entry.category) >= 0) {
      this._entries.push(new Travel(_entry));
    } else if (Activity.TYPES.indexOf(_entry.category) >= 0) {
      this._entries.push(new Activity(_entry));
    } else if (Miscellaneous.TYPES.indexOf(_entry.category) >= 0) {
      this._entries.push(new Miscellaneous(_entry));
    }
  }

  getEntries() {
    return this._entries;
  }

  static getEntryGroups() {
    return [
    {
      'name': 'travel',
      'icon': Travel.icon,
      'types': Travel.TYPES
    }, {
      'name': 'activity',
      'icon': Activity.icon,
      'types': Activity.TYPES
    }, {
      'name': 'miscellaneous',
      'icon': Miscellaneous.icon,
      'types': Miscellaneous.TYPES
    }];
  }

}
