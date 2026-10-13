import { Injectable, signal, WritableSignal } from '@angular/core';



@Injectable()
export class PaneManagerService {
  public readonly opened: WritableSignal<boolean>;
  private _pane: HTMLElement | null;
  private _resolve: Function | null;

  private _onClosedPromise: Promise<boolean> | null;



  public constructor() {
    this.opened = signal(false);

    this._pane              = null;
    this._resolve           = null;
    this._onClosedPromise = null;
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

    this.opened.set(false);

    return this.onClose();
  }

  public onClose() {
    if (this._onClosedPromise !== null) {
      return this._onClosedPromise;
    }

    this._onClosedPromise = new Promise<boolean>(resolve => {
      const onEnd = (event: TransitionEvent) => {
        if (!this._resolve!(event)) {
          return;
        }

        this._pane!.removeEventListener('transitionend', onEnd);
        this._onClosedPromise = null;

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

    return this._onClosedPromise;
  }

  public isClosing() {
    return this._onClosedPromise !== null;
  }
}