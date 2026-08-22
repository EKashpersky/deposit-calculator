import { LocalSpaceInstance } from 'localspace';

import { DomainSerializer } from './domain-serializer.model';



export class DomainStorage<Model, Pojo> {
  private _storage: LocalSpaceInstance;
  private _serializer: DomainSerializer<Model, Pojo>;

  public constructor(
    storage: LocalSpaceInstance,
    serializer: DomainSerializer<Model, Pojo>
  ) {
    this._storage    = storage;
    this._serializer = serializer;
  }



  public getItem(name: string): Promise<Model | null> {
    return this._storage.getItem<Pojo>(name).then(item => {
      return item ? this._serializer.deserialize(name, item) : null;
    });
  }

  public getItems(): Promise<Model[]> {
    return this._storage.keys().then(
      keys => this._storage.getItems<Pojo>(keys)
    ).then(items => {
      console.debug(items, 'items');

      return items.map(
        item => item && this._serializer.deserialize(item.key, item.value!) || null
      )
      .filter(x => x !== null)
    });
  }

  public setItem(name: string, model: Model) {
    this._storage.setItem(name, this._serializer.serialize(model));
  }

  public setItems(items: Model[], name: (item: Model) => string) {
    const mappedItems = items.map(modelx => ({
      key: name(modelx),
      value: items,
    }));

    this._storage.setItems(mappedItems);
  }

  public removeItem(name: string) {
    return this._storage.removeItem(name);
  }

  public removeItems(keys: string[]) {
    return this._storage.removeItems(keys);
  }
}