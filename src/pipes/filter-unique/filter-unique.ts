import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FilterUniquePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'unique',
})
export class FilterUniquePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items: any[], field : string): any[] {

    if (!items) return [];
    var flags = [], output = [], l = items.length, i

    for( i=0; i<l; i++) {
        if( flags[items[i][field]]) continue;
        flags[items[i][field]] = true;
        output.push(items[i]);
    }

    return output
}
}
