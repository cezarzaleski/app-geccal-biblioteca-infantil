import { AppEnvironment, merge } from 'src/environments/environment.common';

export const environment: AppEnvironment = merge({
  production: false,
  hosts: {
    geccal_bibliotecainfantil_ws: {
      host: 'localhost',
      port: '8089',
      protocol: 'http'
    },
  }
});
