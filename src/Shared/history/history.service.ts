import { Injectable } from '@angular/core';

import { ActionsHistory, CommandShape } from './history.model';



@Injectable()
export class HistoryService {
  private _history: ActionsHistory;



  public constructor() {
    this._history = new ActionsHistory();
  }

  public addAction(action: CommandShape) {
    this._history.addAction(action);
  }

  public undoLast() {
    this._history.undoLast();
  }

  public redoLast() {
    this._history.redoLast();
  }

  public canUndo() {
    return this._history.canUndo();
  }

  public canRedo() {
    return this._history.canRedo();
  }

  /**
   * Tries to undo last action if compares with the given action
  **/
  public tryUndo(action: CommandShape) {
    this._history.tryUndo(action);
  }
}
