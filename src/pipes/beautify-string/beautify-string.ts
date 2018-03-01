import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the BeautifyStringPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'beautifyString',
})
export class BeautifyStringPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return value.toLowerCase().split(/[_\s-]+/).map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  }
}
