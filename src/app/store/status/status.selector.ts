import {createFeatureSelector, createSelector} from '@ngrx/store';
import {statusState, statusFeatureKey} from './status.reducer';

export const selectCounterState = createFeatureSelector<statusState>(statusFeatureKey);
export const selectParentStatus = createSelector(selectCounterState, state => state.parentStatus);
export const selectGrandStatus = createSelector(selectCounterState, state => state.grandStatus);
