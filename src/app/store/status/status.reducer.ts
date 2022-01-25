import { Action, createReducer, on } from '@ngrx/store';
import { parentTo0, parentTo1, grandTo0, grandTo1 } from './status.actions';

export type statusState = {
  parentStatus: number,
  grandStatus: number
}

export const initialState: statusState = {
  parentStatus: 0,
  grandStatus: 0
};

const _statusReducer = createReducer(
  initialState,
  on(parentTo0, (state) => { return { ...state, parentStatus: 0 } }),
  on(parentTo1, (state) => { return { ...state, parentStatus: 1 } }),
  on(grandTo0, (state) => { return { ...state, grandStatus: 0 } }),
  on(grandTo1, (state) => { return { ...state, grandStatus: 1 } }),
);

export function statusReducer(state: statusState | undefined, action: Action) {
  return _statusReducer(state, action);
}

export const statusFeatureKey = 'status';