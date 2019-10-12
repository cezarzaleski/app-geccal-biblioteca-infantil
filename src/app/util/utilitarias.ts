import { FormGroup } from '@angular/forms';
import { toast } from 'src/app/util/toast';

export function itemsUnicos(arr, comp) {
  const unique = arr
  .map(e => e[comp])
  .map((e, i, final) => final.indexOf(e) === i && i)
  .filter(e => arr[e]).map(e => arr[e]);

  return unique;
}

export function formatoCnpj(value: string) {
  if (!value) return value;
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d{2})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d)/, '$1/$2');
  value = value.replace(/(\d{4})(\d)/, '$1-$2');

  return value;
}

export function formatoRg(value: string) {
  if (!value) return value;
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{1})$/, '$1.$2.$3-$4');
  return value;
}

export function formatoCpf(value: string) {
  value = value.replace(/\D/g, '');
  return `${value.substr(0, 3)}.${value.substr(3, 3)}.${value.substr(6, 3)}-${value.substr(9, 2)}`;
}

export function formatoCep(value: string) {
  if (!value) return value;
  value = value.replace(/\D/g, '');
  value = value.replace(/(\d{2})(\d{3})(\d{3})$/, '$1.$2-$3');
  return value;
}

export function toTitleCase(str) {
  return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function leftPad(item: any, qtCaracteres, caracter: any) {
  return (caracter.repeat(qtCaracteres) + item).substr((qtCaracteres * -1), qtCaracteres);
}

export function validarFormGerais(form: FormGroup) {
  // form.updateValueAndValidity();
  console.log('valid', form.valid);
  console.log('erro', form.errors);
  if (form.valid) return true;
  const erro = Object.entries(form.controls).filter(control => !control[1].valid).shift();
  if (erro[1].errors.required) {
    toast(`Preencha os campos obrigatórios`);
    return false;
  } else if (erro[1].errors.espacoEmBranco) {
    toast(`Não é permitido campos apenas com espaços em branco.`);
    return false;
  } else if (erro[1].errors.url) {
    toast('URL inválida.');
    return false;
  } else if (erro[1].errors.minlength) {
    toast(`É necessário preencher com mais de 3 caracteres.`);
    return false;
  } else return true;
}

export function formatarBanco(numero: number) {
  let t = numero.toString();
  t = t.replace('.', '');
  t = t.replace(',', '.');
  return t;
}
