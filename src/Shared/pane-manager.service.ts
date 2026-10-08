import { Injectable, signal, WritableSignal } from '@angular/core';



Injectable()
export class PaneManagerService {
  public readonly opened: WritableSignal<boolean>;
  private _pane: HTMLElement | null;
  private _resolve: Function | null;

  public constructor() {
    this.opened = signal(false);
    this._pane = null;
    this._resolve = null;
  }

  public bindPane(pane: HTMLElement, resolve: Function) {
    this._pane = pane;
    this._resolve = resolve;
  }

  public close() {
    if (this._pane === null) {
      throw new Error(`Can't close, no pane is bound!`);
    }

    this.opened.set(false);

    return new Promise<void>(resolve => {
      this._pane!.addEventListener(
        'transitionend',
        event => this._resolve!(event) && resolve(),
        { once: true }
      );
    });
  }
}