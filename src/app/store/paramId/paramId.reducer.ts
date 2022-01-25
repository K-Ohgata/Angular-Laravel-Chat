import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/dataType';
import { setUserId,setLoginUser,setRoomId,setChatId } from './paramId.actions';

export type paramIdState = {
  loginUser:User|null
  userId: number,
  roomId: number,
  chatId: number,
}

export const initialState: paramIdState = {
  loginUser:null,
  userId: 0,
  roomId: 0,
  chatId:0
};

const _paramIdReducer = createReducer(
  initialState,
  on(setUserId, (state,action) => { return { ...state, userId: action.userId } }),
  on(setLoginUser, (state,action) => { return { ...state, loginUser: action.loginUser } }),
  on(setRoomId, (state,action) => { return { ...state, roomId: action.roomId  } }),
  on(setChatId, (state,action) => { return { ...state, chatId: action.chatId  } }),
);

export function paramIdReducer(state: paramIdState | undefined, action: Action) {
  return _paramIdReducer(state, action);
}

export const paramIdFeatureKey = 'paramId';