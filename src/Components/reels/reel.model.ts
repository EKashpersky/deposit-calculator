
export class ReelModel<const T extends any[]> {
  private _dictionary: T;
  private _value: T[keyof T] | null;



  public constructor(
    dictionary: T,
    value: (T[number] | null) = null,
  ) {
    this._dictionary = dictionary;
    this._value = value;
  }



  public dictionary() {
    return this._dictionary;
  }

  public value() {
    return this._value;
  }

  public indexOfValueInDictionary() {
    return this._dictionary.indexOf(this._value);
  }
}

