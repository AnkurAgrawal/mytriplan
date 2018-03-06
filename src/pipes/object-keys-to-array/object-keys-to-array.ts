import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ObjectKeysToArrayPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'objectKeysToArray',
})
export class ObjectKeysToArrayPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return Object.keys(value);
  }
}
