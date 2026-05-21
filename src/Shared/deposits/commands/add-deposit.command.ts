import { CommandShape } from '@shared/history';
import { DepositModel } from '@features/calculator/model';

import { DepositCommandContext } from '../deposit-command.context';



export class AddDepositCommand implements CommandShape {
  public constructor(
    private _context: DepositCommandContext,
    private _newDeposit: DepositModel,
  ) { }

  public do(): void {
    this._context.storage.setItem(this._newDeposit.name(), this._newDeposit);
    this._context.deposits.update(deposits => [...deposits, this._newDeposit]);
  }

  public undo(): void {
    this._context.storage.removeItem(this._newDeposit.name());

    this._context.deposits.update(deposits => {
      deposits.splice(deposits.indexOf(this._newDeposit), 1);
      return [...deposits];
    });
  }
}
