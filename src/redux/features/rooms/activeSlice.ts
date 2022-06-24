import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Room } from '../../../../types';

const activeSlice = createSlice({
  name: 'active',
  initialState: {
    active: null as Room | null,
  },
  reducers: {
    setActive: (state, action: PayloadAction<Room | null>) => {
      const room = action.payload;
      state.active = room;
    },
  },
});

export const { setActive } = activeSlice.actions;
export default activeSlice.reducer;
