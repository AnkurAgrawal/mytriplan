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
  transform(value: string, args?: string) {
    return value.split(/(?=[A-Z])|[_\s-]+/).map((word) => {
      word = (word.toLowerCase()=='id'?'#':word);

      if (args == undefined) {
        args = 'title';
      }
      args = args.toLowerCase();

      if (args == 'title') {
        return word.toLowerCase().charAt(0).toUpperCase() + word.slice(1);
      } else if (args == 'small') {
        return word.toLowerCase();
      } else if (args == 'caps') {
        return word.toUpperCase();
      }
      return word;
    }).join(' ');
  }
}
