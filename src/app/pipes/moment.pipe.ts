import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'moment'
})
export class MomentPipe
  implements PipeTransform {
  transform(value: any, input?: string, output?: string): any {
    if (value == null || value === '') {
      return null;
    }
    return moment(value, input || null).format(output);
  }

}
