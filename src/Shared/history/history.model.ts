export interface CommandShape {
  undo(): void;
  do(): void;
}

export class ActionsHistory {
  private _maxSize: number;
  private _pastActions: CommandShape[];
  private _futureActions: CommandShape[];



  public constructor(maxSize: number = Infinity) {
    this._maxSize = maxSize;

    this._pastActions = [];
    this._futureActions = [];
  }

  public addAction(action: CommandShape) {
    if (this._pastActions.length > this._maxSize) {
      this._pastActions.shift();
    }

    this._pastActions.push(action);
    action.do();

    if (this._futureActions.length > 0) {
      this._futureActions = [];
    }
  }

  public undoLast() {
    const lastAction = this._pastActions.pop() || null;
    if (lastAction) {
      lastAction.undo();
      this._futureActions.push(lastAction);
    }
  }

  public redoLast() {
    const futureAction = this._futureActions.pop() || null;
    if (futureAction) {
      futureAction.do();
      this._pastActions.push(futureAction);
    }
  }

  public canUndo() {
    return this._pastActions.length > 0;
  }

  public canRedo() {
    return this._futureActions.length > 0;
  }

  public tryUndo(action: CommandShape) {
    if (this._pastActions.at(-1) === action) {
      this.undoLast();
    }
  }
}