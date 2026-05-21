import { CommandShape } from '@shared/history';

import { DepositCommandContext } from '../deposit-command.context';



export class RenameDepositCommand implements CommandShape {
  public constructor(
    private _context: DepositCommandContext,
    private _oldName: string,
    private _newName: string,
  ) { }

  public do(): void {
    this._context.deposits.update(deposits => {
      const deposit = this._context.deposits().find(d => d.name() === this._oldName);

      deposit!.setName(this._newName);

      this._context.storage.removeItem(this._oldName);
      this._context.storage.setItem(this._newName, deposit!);

      return [...deposits];
    });
  }

  public undo(): void {
    this._context.deposits.update(deposits => {
      const deposit = this._context.deposits().find(d => d.name() === this._newName);
      deposit!.setName(this._oldName);
  
      this._context.storage.removeItem(this._newName);
      this._context.storage.setItem(this._oldName, deposit!);

      return [...deposits];
    });
  }
}