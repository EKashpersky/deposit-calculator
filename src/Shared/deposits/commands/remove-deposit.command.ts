import { DepositModel } from '@features/calculator/model';
import { CommandShape } from '@shared/history';

import { DepositCommandContext } from '../deposit-command.context';



export class RemoveDepositCommand implements CommandShape {
  public constructor(
    private _context: DepositCommandContext,
    private _depositToRemove: DepositModel,
  ) { }

  public do(): void {
    this._context.storage.removeItem(this._depositToRemove.name());

    this._context.deposits.update(deposits => {
      /// Remove operation itself
      deposits.splice(deposits.indexOf(this._depositToRemove), 1);
      return [...deposits];
    });
  }

  public undo() {
    this._context.deposits.update(deposits => {
      return (deposits.push(this._depositToRemove), [...deposits]);
    });

    this._context.storage.setItem(
      this._depositToRemove.name(),
      this._depositToRemove
    );
  }
}