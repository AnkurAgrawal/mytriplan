import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the IsTypePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'isType',
})
export class IsTypePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args: string[]) {
    return args.some(arg => value.toLowerCase().startsWith(arg.toLowerCase()));
  }
}
