export interface KeyValueEntry<T> {
  key: string;
  value: T;
}

export interface KeyValueStore {
  getItem<T>(key: string): Promise<T | null>;
  setItem<T>(key: string, value: T): Promise<T>;
  getItems<T>(keys: string[]): Promise<Array<{ key: string; value: T | null }>>;
  setItems<T>(entries: KeyValueEntry<T>[]): Promise<KeyValueEntry<T>[]>;
  removeItem(key: string): Promise<void>;
  removeItems(keys: string[]): Promise<void>;
  keys(): Promise<string[]>;
}
