import { Status } from '@/config/status';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatUser } from '../../../../types';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [] as ChatUser[],
  },
  reducers: {
    addUser: (state, action: PayloadAction<ChatUser>) => {
      const user = action.payload;
      if (state.users.find((u: any) => u.username === user.username)) {
        return;
      }
      state.users.push(user);
    },
    setUsers: (state, action: PayloadAction<ChatUser[]>) => {
      const users: ChatUser[] = [];
      action.payload.forEach((u: any) => {
        users.push(u);
      });
      if (users && users.length > 0) {
        const sorted_users = users.sort((a: ChatUser, b: ChatUser) => {
          const statusOrder = Object.values(Status);
          const aIndex = statusOrder.indexOf(a.status);
          const bIndex = statusOrder.indexOf(b.status);
          return aIndex - bIndex;
        });
        state.users = sorted_users;
      }
    },
  },
});

export const { setUsers, addUser } = usersSlice.actions;
export default usersSlice.reducer;
