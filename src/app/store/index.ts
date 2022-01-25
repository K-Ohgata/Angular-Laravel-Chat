import { ActionReducerMap } from "@ngrx/store";
import { statusReducer, statusState } from "./status/status.reducer";
import { paramIdReducer, paramIdState } from "./paramId/paramId.reducer";

interface AppState {
  statusState: statusState;
  paramIdState: paramIdState;
}

export const reducers: ActionReducerMap<AppState> = {
  statusState: statusReducer,
  paramIdState: paramIdReducer,
};