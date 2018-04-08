import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SanitizeStringPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'sanitizeString',
})
export class SanitizeStringPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, args?: string) {
    return value.toLowerCase().replace(/\s/gi, '_');
  }
}
