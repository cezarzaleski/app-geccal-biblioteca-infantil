import { Pipe, PipeTransform } from '@angular/core';
import { formatoCep } from 'src/app/util/utilitarias';

@Pipe({
  name: 'cep'
})
export class CepPipe
  implements PipeTransform {
  static transform(value: any): string {
    return formatoCep(value);
  }

  transform(value: any, args?: any): any {
    return CepPipe.transform(value);
  }
}
