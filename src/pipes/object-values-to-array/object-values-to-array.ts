import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ObjectValuesToArrayPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'objectValuesToArray',
})
export class ObjectValuesToArrayPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return Object.keys(value).map(key => {
      return value[key];
    });
  }
}
