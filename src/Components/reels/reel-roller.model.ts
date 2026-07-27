import { ReelModel } from './reel.model';



export class ReelRollerModel<TReels extends readonly ReelModel<any>[]> {
  protected _reels: TReels;



  public static Empty() {
    return new ReelRollerModel([new ReelModel([])]);
  }


  public constructor(reels: TReels);
  public constructor(...reels: TReels);
  public constructor(...reels: any[]) {
    if (Array.isArray(reels[0])) {
      this._reels = reels[0] as unknown as TReels;
    } else if (!Array.isArray(reels[0])) {
      this._reels = reels as unknown as TReels;
    } else {
      throw new Error(`Invalid arguments for ReelRollerModel constructor`);
    }
  }

  public value() {
    return this._reels.reduce((string, valuex) => {
      return string + `${valuex.value()}`;
    }, '');
  }

  public reels() {
    return this._reels;
  }

}