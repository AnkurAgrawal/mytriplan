/**
 * The Plans service manages creating instances of Plan, so go ahead and rename
 * that something that fits your app as well.
 */

import { Validators } from '@angular/forms';
import { FormValidators } from '../providers/form-generator/form-validators';

export abstract class Plan implements FormValidators {
  static ICON: string = 'pencil';
  static GROUP: string;
  static NAME: string;

  constructor(fields?: any) { }

  protected patchValues(values: {[key: string] : any}, currentLevel?: string) {

    for (const f in values) {
      if (f != 'group') {
        if (typeof values[f] == 'object') {
          this.patchValues(values[f], f);
        } else {
          currentLevel? this[currentLevel][f] = values[f]: this[f] = values[f];
        }
      }
    }
  }

  public static getInstance() { }

  get name(): string {
    return this.constructor['NAME'];
  }

  get icon(): string {
    return this.constructor['ICON'];
  }

  get group(): string {
    return this.constructor['GROUP'];
  }

  set group(_group: string) {
    this.constructor['GROUP'] = _group;
  }

  abstract get date(): string;
  abstract set date(value: string);

  abstract get time(): string;
  abstract set time(value: string);

  abstract get address(): string;
  abstract set address(value: string);

  public abstract validators(): { [key: string]: Validators };

}
