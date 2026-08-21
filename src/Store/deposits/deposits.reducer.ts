// import { createReducer, on } from '@ngrx/store';

// import { DepositModel } from '@features/calculator/model';

// import { DepositsActions } from './deposits.actions';



// const initialState: DepositModel[] = [];

// export const depositsReducer = createReducer(
//   initialState,
//   on(DepositsActions.AddNew, (state, { deposit, index }) => {
//     state.splice(index, 0, deposit);
//     return [...state];
//   }),
//   on(DepositsActions.Remove, (state, { deposit }) => {
//     const name = deposit.name();
//     state.splice(state.findIndex(deposit => deposit.name() === name), 1);
//     return [...state];
//   }),
//   on(DepositsActions.Rename, (state, { name, newName }) => {
//     const theDeposit = state.find(deposit => deposit.name() === name);
//     theDeposit?.setName(newName);
//     return [...state];
//   }),
// );