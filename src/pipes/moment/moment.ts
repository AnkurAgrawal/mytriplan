import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

/**
 * Generated class for the MomentPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'moment',
})
export class MomentPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args: string[]) {
    if (args.length <= 1) {
      return args[0] === 'ago' ? moment(value).fromNow() : moment(value).format(args[0]);
    } else {
      return moment(value, args[0]).format(args[1]);
    }
  }
}
