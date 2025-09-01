import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import authSlice from './authSlice';
import formSlice from './formSlice';
import logSlice from './logSlice';

// Typed versions of useDispatch and useSelector
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// import other slices here
// import userSlice from './userSlice';
export const store = configureStore({
  reducer: {
    log: logSlice,
    form: formSlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
