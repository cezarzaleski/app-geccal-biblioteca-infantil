import { AppEnvironment, merge } from 'src/environments/environment.common';

export const environment: AppEnvironment = merge({
  production: false,
  hosts: {
    sisbi: {
      host: 'localhost',
      port: '8080',
      protocol: 'http'
    },
    corporativo: {
      host: 'localhost',
      port: '8081',
      protocol: 'http'
    },
    arquivo: {
      host: 'localhost',
      port: '8082',
      protocol: 'http'
    },
    gis: {
      host: 'localhost',
      port: '8083',
      protocol: 'http'
    },
    segadmin: {
      host: 'localhost',
      port: '8084',
      protocol: 'http'
    }
  }
});
