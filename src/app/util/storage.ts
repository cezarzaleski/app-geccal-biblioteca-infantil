import { inject } from 'src/app/util/inject';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

const get = async (key: string, prefix?: string): Promise<any> => {
  const appKey = environment.app;
  if (prefix) key = `${appKey}:${prefix}:${key}`;
  else key = `${appKey}:${key}`;
  const s: Storage = await inject(Storage);
  return s.get(key);
};

const set = async (key: string, value: any, prefix?: string): Promise<any> => {
  const appKey = environment.app;
  if (prefix) key = `${appKey}:${prefix}:${key}`;
  else key = `${appKey}:${key}`;
  const s: Storage = await inject(Storage);
  return s.set(key, value);
};

const storage = {
  get, set
};

export { storage };
window['storage'] = storage;
