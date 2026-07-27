import { ReelRollerModel } from '../reels/reel-roller.model';
import { ReelModel } from '../reels/reel.model';



export class ReelRollerCurrencyModel<TReels extends readonly ReelModel<any>[]> extends ReelRollerModel<TReels> {
  public updateCurrency(currencyReel: ReelModel<any>) {
    return new ReelRollerCurrencyModel(
      currencyReel,
      ...this._reels.slice(1),
    );
  }

  public updateValue(valueReels: ReelModel<any>[]) {
    return new ReelRollerCurrencyModel(
      this._reels[0],
      this._reels[1],
      ...valueReels
    );
  }
}