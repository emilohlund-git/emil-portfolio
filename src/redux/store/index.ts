import activeReducer from '@/features/rooms/activeSlice';
import roomsReducer from '@/features/rooms/roomsSlice';
import userReducer from '@/features/users/userSlice';
import usersReducer from '@/features/users/usersSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/lib/persistReducer';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  users: usersReducer,
  user: userReducer,
  rooms: roomsReducer,
  active: activeReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['rooms', 'active', 'users'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
