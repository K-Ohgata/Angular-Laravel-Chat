import {createFeatureSelector, createSelector} from '@ngrx/store';
import {paramIdState, paramIdFeatureKey} from './paramId.reducer';

export const selectIdState = createFeatureSelector<paramIdState>(paramIdFeatureKey);
// export const selectIdState = (state:any)=>state.initialState;
export const selectUserId = createSelector(selectIdState, state => state.userId);
export const selectLoginUser = createSelector(selectIdState, state => state.loginUser);
export const selectRoomId = createSelector(selectIdState, state => state.roomId);
export const selectChatId = createSelector(selectIdState, state => state.chatId);