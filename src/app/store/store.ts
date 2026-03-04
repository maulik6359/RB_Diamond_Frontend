import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/authSlice.ts";
import employeeReducer from "../../features/employees/employeeSlice.ts";
import clientReducer from "../../features/clients/clientSlice.ts";
import packetReducer from "../../features/packets/packetSlice.ts";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer,
    client: clientReducer,
    packet: packetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
