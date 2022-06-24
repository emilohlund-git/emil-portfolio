import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { ChatUser } from '../../../../types';

const initialState = {
  user: null as ChatUser | null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<ChatUser>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      storage.removeItem(`persist:root`);
      state.user = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
