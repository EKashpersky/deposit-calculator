import { Injectable, signal, Signal } from '@angular/core';
import { tinykeys } from 'tinykeys';



@Injectable()
export class ShortcutsService {
  private _unsubscribe: () => void;

  public readonly undo: Signal<number>;
  public readonly redo: Signal<number>;



  public constructor() {
    const undo = signal<number>(0);
    const redo = signal<number>(0);

    this.undo = undo.asReadonly();
    this.redo = redo.asReadonly();

    this._unsubscribe = tinykeys(window, {
      'Meta+z': () => {
        undo.set(performance.now());
      },
      'Meta+Shift+z': () => {
        redo.set(performance.now());
      },
    });
  }
}
