import { beforeEach, describe, expect, it } from 'vitest';

import { LocalStorageStore } from './local-storage.store';



class MemoryStorage implements Storage {
  private _data = new Map<string, string>();

  public get length() {
    return this._data.size;
  }

  public clear() {
    this._data.clear();
  }

  public getItem(key: string) {
    return this._data.get(key) ?? null;
  }

  public key(index: number) {
    return [...this._data.keys()][index] ?? null;
  }

  public removeItem(key: string) {
    this._data.delete(key);
  }

  public setItem(key: string, value: string) {
    this._data.set(key, String(value));
  }
}



describe('LocalStorageStore', () => {
  const prefix = 'dc/deposits/';
  let store: LocalStorageStore;

  beforeEach(() => {
    if (typeof localStorage.setItem !== 'function') {
      Object.defineProperty(globalThis, 'localStorage', {
        configurable: true,
        value: new MemoryStorage(),
      });
    }

    for (let index = localStorage.length - 1; index >= 0; index--) {
      const key = localStorage.key(index);

      if (key?.startsWith(prefix)) {
        localStorage.removeItem(key);
      }
    }

    store = new LocalStorageStore('dc', 'deposits');
  });

  it('round-trips a value under the dc/deposits prefix', async () => {
    await store.setItem('alpha', { principal: 100 });

    expect(localStorage.getItem(`${prefix}alpha`)).toBe('{"principal":100}');
    await expect(store.getItem('alpha')).resolves.toEqual({ principal: 100 });
    await expect(store.getItem('missing')).resolves.toBeNull();
  });

  it('lists only keys from this store and keeps getItems order', async () => {
    localStorage.setItem('dc/preferences/theme', '"dark"');
    await store.setItem('beta', 2);
    await store.setItem('alpha', 1);

    await expect(store.keys()).resolves.toEqual(expect.arrayContaining(['beta', 'alpha']));
    await expect(store.keys()).resolves.toHaveLength(2);
    await expect(store.getItems(['alpha', 'missing', 'beta'])).resolves.toEqual([
      { key: 'alpha', value: 1 },
      { key: 'missing', value: null },
      { key: 'beta', value: 2 },
    ]);
  });

  it('removes one key and a batch', async () => {
    await store.setItems([
      { key: 'alpha', value: 1 },
      { key: 'beta', value: 2 },
      { key: 'gamma', value: 3 },
    ]);

    await store.removeItem('beta');
    await store.removeItems(['alpha', 'gamma']);

    await expect(store.keys()).resolves.toEqual([]);
  });
});
