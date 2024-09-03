import { RootState } from "../../store";

export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const selectUserId = (state: RootState) => state.user.id;