import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Room } from '../../../../types';

const roomsSlice = createSlice({
  name: 'rooms',
  initialState: {
    rooms: [] as Room[],
  },
  reducers: {
    addRoom: (state, action: PayloadAction<Room>) => {
      const room = action.payload;
      if (state.rooms.find((u: Room) => u.uid === room.uid)) {
        return;
      }
      state.rooms.push(room);
    },
    setRooms: (state, action: PayloadAction<Room[]>) => {
      state.rooms = action.payload;
    },
  },
});

export const { addRoom, setRooms } = roomsSlice.actions;
export default roomsSlice.reducer;
