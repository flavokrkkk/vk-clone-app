import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface SocketState {
  socket: WebSocket | null;
}

const initialState = <SocketState>{
  socket: null,
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: (state, { payload }: PayloadAction<WebSocket | null>) => {
      state.socket = payload;
    },
  },
});

export const socketReducer = socketSlice.reducer;
export const socketActions = socketSlice.actions;
