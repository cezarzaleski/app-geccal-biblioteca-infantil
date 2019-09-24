/**
 * Função de resovler um endpoint, dado um host.
 * @param target Um endpoint alvo, com host. Exemplo: 'cadsus/login'
 * @param args Argumentos a serem trocados na URL
 * @param keep Se argumentos não encontrados na URL devem ser adicionados como parâmetro da querystring
 * @returns URL resolvida
 */
import { environment } from 'src/environments/environment';

function resolve(target: string, args?: {[k: string]: any } | any, keep: boolean = true): string {
  const data: string[] = target.split('://');
  let host: string, endpoint: string;
  if (data.length === 1) {
    host = environment.default;
    endpoint = data[0];
  } else {
    host = data[0];
    endpoint = data[1];
  }

  const hostConfig = environment.hosts[host];
  let port = hostConfig.port;
  if (port && !port.startsWith(':')) port = ':' + port;

  let root = hostConfig.root;
  if (root && !root.startsWith('/')) root = '/' + root;
  if (root && !root.endsWith('/')) root = root + '/';

  const path = hostConfig.endpoints[endpoint];

  const targets = path.match(/:\w+/g);

  /* se o args nao for objeto com chave: valor, (ex: o arg eh um literal ou um unico valor)
     usa o primeiro replace target como alvo
     do arg
   */
  if (args && typeof args === 'object' && Object.keys(args).length) {
    args = Object.assign({}, args);
  } else {
    if (!targets || !targets.length) args = {};
    else if (args) {
      const arg = args;
      args = {};
      args[targets[0].replace(':', '')] = arg;
    }
  }

  endpoint = replace((hostConfig.endpoints[endpoint] || ''), args, keep);

  return `${hostConfig.protocol}://${hostConfig.host}${port}${root}${endpoint}`;
}

function flattenObject(object: any, pairSeparator: string = '&', kvSeparator: string = '='): string {
  const strings: string[] = [];
  object = object || {};
  for (const key of Object.getOwnPropertyNames(object)) {
    const value = object[key];
    if (value === null || value === undefined) {
      continue;
    }
    if (Array.isArray(value)) {
      strings.push(flattenArray(key, value));
    } else { strings.push(`${key}${kvSeparator}${value}`); }
  }
  return strings.join(pairSeparator);
}

function flattenArray(key: string, array: string[]): string {
  return array.map(d => `${key}=${d}`).join('&');
}

function replace(base: string, params: any = {}, keep: boolean = true): string {
  params = params || {};
  for (const key of Object.getOwnPropertyNames(params)) {
    let value: any = params[key];
    if (value && typeof value === 'object') {
      if (Array.isArray(value)) value = flattenArray(key, value);
      else value = flattenObject(value);
    }
    if (value === null || value === undefined) value = '';
    const next = base.replace(new RegExp(`:${key}`, 'g'), value);
    if (base !== next) delete params[key];
    base = next;
  }

  if (Object.getOwnPropertyNames(params).length > 0 && keep) {
    if (base.indexOf('?') === -1) base += '?';
    else base += '&';
    base += flattenObject(params);
  }
  return base;
}

export { resolve };
