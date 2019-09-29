import { Pipe, PipeTransform } from '@angular/core';
import { formatoCpf } from 'src/app/util/utilitarias';

@Pipe({
  name: 'cpf'
})
export class CpfPipe
  implements PipeTransform {
  static transform(value: any): string {
    return formatoCpf(value);
  }

  transform(value: any, args?: any): any {
    return CpfPipe.transform(value);
  }
}
