import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf'
})
export class CpfPipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (!value) return '';
    // Remove tudo que não for dígito
    const cpf = value.replace(/\D/g, '');
    if (cpf.length !== 11) return value;
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}
