import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

/*
  Generated class for the FormGeneratorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export abstract class FormGeneratorProvider<T> {

  constructor(private params: {
    formBuilder: FormBuilder,
    schema: () => { [key: string]: any[] },
    complexMapper?: { [key: string]: FormGeneratorProvider<any> }
  }) {
  }

  create(data: T) {

    let keysToAdd = Object.keys(data).filter(k => !Object.keys(this.params.schema()).some(pk => pk === k));

    if (this.params.complexMapper !== undefined) {
      keysToAdd = keysToAdd.filter(k => !Object.keys(this.params.complexMapper).some(cmk => cmk === k));
    }
    let objectKeysToAdd = keysToAdd.filter(k => (typeof data[k] == 'object'));
    keysToAdd = keysToAdd.filter(k => !(typeof data[k] == 'object'));

    const schema = this.params.schema();
    keysToAdd.forEach(k => schema[k] = []);

    const form = this.params.formBuilder.group(schema);

    form.patchValue(data);

    objectKeysToAdd.forEach(k => form.addControl(k, this.create(data[k])));

    if (this.params.complexMapper !== undefined) {
      Object.keys(this.params.complexMapper).forEach(prop => {
        if (Array.isArray(data[prop])) {
          let childArray = this.params.formBuilder.array([]);
          for (let i = 0; i < data[prop].length; i++) {
            let childArrayFormItem = this.params.complexMapper[prop].create(data[prop][i]);
            childArray.push(childArrayFormItem);
          }
          form.addControl(prop, childArray);
        } else {
          let childForm = this.params.complexMapper[prop].create(data[prop]);
          form.addControl(prop, childForm);
        }
      });
    }

    return form;
  }
}
