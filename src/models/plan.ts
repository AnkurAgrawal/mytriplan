/**
 * The Plans service manages creating instances of Plan, so go ahead and rename
 * that something that fits your app as well.
 */

export abstract class Plan {
  static ICON: string = 'pencil';
  static GROUP: string;
  static NAME: string;

  date: string = '';
  time: string = '';
  address: string = '';

  constructor(fields?: any) {
    // Quick and dirty extend/assign fields to this model
    for (const f in fields) {
      if (f != 'group')
        this[f] = fields[f];
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

}
