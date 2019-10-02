import { Perfil } from 'src/app/interfaces/perfil';
import { Colaborador } from 'src/app/interfaces/colaborador';

export interface Usuario {
  idUsuario?: number;
  noUsuario?: string;
  dtCadastro?: string;
  stAtivo?: number;
  dtUltVisita?: string;
  dtDesativacao?: string;
  perfil?: Perfil;
  colaborador?: Colaborador;
  token?: string;
}
