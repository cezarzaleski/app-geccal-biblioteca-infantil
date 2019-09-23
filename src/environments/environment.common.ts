import * as _ from 'lodash';

/* Formato de especificação de env. Esse é o arquivo base e deve
   conter conteúdo usado por todos os ambientes. Os ambientes específicos
   devem sobrescrever o que for necessário */


export interface AppHostConfig {
  host?: string;
  protocol?: string;
  port?: string;
  root?: string;
  unauthenticated?: boolean;
  endpoints?: {
    [name: string]: string;
  };
}

export interface ValueConfig {
  [name: string]: string | number | ValueConfig;
}

export interface AppEnvironment {
  production: boolean;
  default?: string;
  app?: 'geccal-biblioteca-infantil';
  hosts?: {
    [name: string]: AppHostConfig
  };
  values?: ValueConfig;
}

export const environment: AppEnvironment = {
  production: false,
  default: 'geccal_bibliotecainfantil_ws',
  app: 'geccal-biblioteca-infantil',
  hosts: {
    geccal_bibliotecainfantil_ws: {
      host: '',
      protocol: 'https',
      port: '',
      root: '/',
      endpoints: {
        'login': 'login',
        'legislacoes/id': 'legislacoes/:id',
      }
    },
  }
};

export function merge(...env: AppEnvironment[]): AppEnvironment {
  return _.merge({}, environment, ...env);
}
