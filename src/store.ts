import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { technical } from '@/state/technical.ts';

const store = configureStore({
  reducer: {
    technical,
  },
});

export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
export { store };
