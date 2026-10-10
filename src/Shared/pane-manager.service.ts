import { Injectable, signal, WritableSignal } from '@angular/core';



@Injectable()
export class PaneManagerService {
  public readonly opened: WritableSignal<boolean>;
  private _pane: HTMLElement | null;
  private _resolve: Function | null;

  private _whenClosedPromise: Promise<boolean> | null;



  public constructor() {
    this.opened = signal(false);

    this._pane              = null;
    this._resolve           = null;
    this._whenClosedPromise = null;
  }

  public bindPane(pane: HTMLElement, resolve: Function) {
    this._pane    = pane;
    this._resolve = resolve;
  }

  public openPane() {
    this.opened.set(true);
  }

  public close() {
    if (this._pane === null) {
      throw new Error(`Can't close, no pane is bound!`);
    }

    if (this._whenClosedPromise !== null) {
      return this._whenClosedPromise;
    }

    this.opened.set(false);

    this._whenClosedPromise = new Promise<boolean>(resolve => {
      const onEnd = (event: TransitionEvent) => {
        if (!this._resolve!(event)) {
          return;
        }

        this._pane!.removeEventListener('transitionend', onEnd);
        this._whenClosedPromise = null;

        if (this.opened()) {
          resolve(false);
          return;
        }

        this._pane = null;
        this._resolve = null;
        resolve(true);
      };

      this._pane!.addEventListener('transitionend', onEnd);
    });

    return this._whenClosedPromise;
  }

  public isClosing() {
    return this._whenClosedPromise !== null;
  }
}