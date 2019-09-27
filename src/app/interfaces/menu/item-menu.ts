import { Secao } from 'src/app/interfaces/menu/secao';

export interface ItemMenu {
  id?: string;
  icone?: string;
  link?: string;
  nome?: string;
  secoes?: Secao[];
}
