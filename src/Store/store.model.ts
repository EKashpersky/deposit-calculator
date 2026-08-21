// import { createReducer } from '@ngrx/store';

import { DepositModel } from '@features/calculator/model';



export interface AppStoreShape {
  readonly deposits: DepositModel[];
}

const initialState: AppStoreShape = {
  deposits: [] as DepositModel[],
};

// export const appStore = createReducer()