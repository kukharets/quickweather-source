import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  value: 1,
};

const technicalSlice = createSlice({
  name: 'technical',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  selectors: {
    selectTestValue: (state) => state.value,
  },
});

export const {
  reducer: technical,
  selectors: { selectTestValue },
} = technicalSlice;

export const { increment } = technicalSlice.actions;
