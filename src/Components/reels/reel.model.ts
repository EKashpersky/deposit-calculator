
export class ReelModel<const T extends any[]> {
  private _dictionary: T;
  private _value: T[keyof T] | null;
  private _variable: boolean;



  public constructor(
    dictionary: T,
    value: (T[number] | null) = null,
    variable: boolean = false,
  ) {
    this._dictionary  = dictionary;
    this._value       = value;
    this._variable    = variable;
  }



  public dictionary() {
    return this._dictionary;
  }

  public value() {
    return this._value;
  }

  public variable() {
    return this._variable;
  }

  public indexOfValueInDictionary() {
    return this._dictionary.indexOf(this._value);
  }
}

