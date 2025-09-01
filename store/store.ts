import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AnyAction } from 'redux';
import { combineReducers } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import logSlice from './logSlice';
import formSlice from './formSlice';
import authSlice from './authSlice';

// Typed versions of useDispatch and useSelector
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// import other slices here
// import userSlice from './userSlice';

export const rootReducer = combineReducers({
    log: logSlice,
    form: formSlice,
    auth: authSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
