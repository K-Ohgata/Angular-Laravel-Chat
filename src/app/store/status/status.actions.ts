import { createAction } from '@ngrx/store';

export const parentTo0 = createAction('[Change parentStatus] status 0');
export const parentTo1 = createAction('[Change parentStatus] status 1');
export const grandTo0 = createAction('[Change grandStatus] status 0');
export const grandTo1 = createAction('[Change grandStatus] status 1');