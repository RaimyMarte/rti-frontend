import { createSlice } from '@reduxjs/toolkit';
import { UserInterface, } from '../../interfaces';

export interface TFAState {
  TFAEnabled: boolean
  userId: string | undefined
}

interface InitialState {
  status: string,
  user: UserInterface | null
  tfaState: TFAState | null
  isUserAdmin: boolean
}

const initialState: InitialState = {
  status: "checking", //'checking', 'not-authenticated', 'authenticated', 'tfa'
  user: null,
  tfaState: null,
  isUserAdmin: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginState: (state, { payload }: { payload: UserInterface | null }) => {
      state.status = "authenticated";
      state.user = payload
      state.isUserAdmin = payload?.UserRoleId === 1 || payload?.UserRoleId === 2
    },

    userTFAState: (state, { payload }: { payload: TFAState | null }) => {
      state.status = "tfa";
      state.tfaState = payload
    },

    logoutState: (state) => {
      state.status = "not-authenticated";
      state.user = null
    },

    checkingCredentials: (state) => {
      state.status = "checking";
    },
  }
});

// Action creators are generated for each case reducer function
export const { loginState, userTFAState, logoutState, checkingCredentials } = authSlice.actions;