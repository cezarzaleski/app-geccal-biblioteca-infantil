import { Pipe, PipeTransform } from '@angular/core';
import { formatoRg } from 'src/app/util/utilitarias';

@Pipe({
  name: 'rg'
})
export class RgPipe
  implements PipeTransform {
  transform(value: any): any {
    return formatoRg(value);
  }
}
