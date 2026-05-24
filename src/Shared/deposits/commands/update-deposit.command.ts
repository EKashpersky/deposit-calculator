import { CommandShape } from '@shared/history';
import { DepositModel } from '@features/calculator/model';

import { DepositCommandContext } from '../deposit-command.context';



export class UpdateDepositCommand implements CommandShape {
  public constructor(
    private _context: DepositCommandContext,
    private _oldDeposit: DepositModel,
    private _newDeposit: DepositModel,
  ) { }

  public do(): void {
    this._context.storage.setItem(
      this._newDeposit.name(),
      this._newDeposit
    );

    this._context.deposits.update(deposits => {
      deposits[deposits.indexOf(this._oldDeposit)] = this._newDeposit;
      return [...deposits];
    });
  }

  public undo(): void {
    this._context.storage.setItem(
      this._oldDeposit.name(),
      this._oldDeposit
    );

    this._context.deposits.update(deposits => {
      deposits[deposits.indexOf(this._newDeposit)] = this._oldDeposit;
      return [...deposits];
    });
  }
}