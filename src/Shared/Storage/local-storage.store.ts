import { KeyValueEntry, KeyValueStore } from './key-value-store.model';



export class LocalStorageStore implements KeyValueStore {
  private readonly _prefix: string;

  public constructor(dbName: string, storeName: string) {
    this._prefix = `${dbName}/${storeName}/`;
  }

  public getItem<T>(key: string): Promise<T | null> {
    return Promise.resolve().then(() => {
      const raw = localStorage.getItem(this._prefix + key);

      if (raw === null) {
        return null;
      }

      return JSON.parse(raw) as T;
    });
  }

  public setItem<T>(key: string, value: T): Promise<T> {
    return Promise.resolve().then(() => {
      localStorage.setItem(this._prefix + key, JSON.stringify(value));
      return value;
    });
  }

  public getItems<T>(keys: string[]): Promise<Array<{ key: string; value: T | null }>> {
    return Promise.all(keys.map(async key => ({
      key,
      value: await this.getItem<T>(key),
    })));
  }

  public setItems<T>(entries: KeyValueEntry<T>[]): Promise<KeyValueEntry<T>[]> {
    return Promise.all(entries.map(entry =>
      this.setItem(entry.key, entry.value).then(() => entry)
    ));
  }

  public removeItem(key: string): Promise<void> {
    return Promise.resolve().then(() => {
      localStorage.removeItem(this._prefix + key);
    });
  }

  public removeItems(keys: string[]): Promise<void> {
    return Promise.all(keys.map(key => this.removeItem(key))).then(() => undefined);
  }

  public keys(): Promise<string[]> {
    return Promise.resolve().then(() => {
      const keys: string[] = [];

      for (let index = 0; index < localStorage.length; index++) {
        const storedKey = localStorage.key(index);

        if (storedKey?.startsWith(this._prefix)) {
          keys.push(storedKey.slice(this._prefix.length));
        }
      }

      return keys;
    });
  }
}
