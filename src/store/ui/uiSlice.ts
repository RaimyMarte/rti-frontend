import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  isSidebarOpen: boolean,
}

const initialState: InitialState = {
  isSidebarOpen: true
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    onToggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen
    },
  }
});

// Action creators are generated for each case reducer function
export const { onToggleSidebar, } = uiSlice.actions;