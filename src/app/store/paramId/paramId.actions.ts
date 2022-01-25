import { createAction,props } from '@ngrx/store';
import { User } from 'src/app/dataType';

export const setUserId = createAction('[Set UserId]',props<{ userId: number }>());
export const setLoginUser = createAction('[Set LoginUser]',props<{ loginUser: User }>());
export const setRoomId = createAction('[Set RoomId]',props<{ roomId: number }>());
export const setChatId = createAction('[Set ChatId]',props<{ chatId: number }>());