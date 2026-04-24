import { configureStore } from "@reduxjs/toolkit";
import todoListSlice from "./todoListSlice.js";
import weatherSlice from "./wetherSlice.js";

export const store = configureStore({
    reducer: {
       todoList: todoListSlice,
       weather: weatherSlice
    },
});

export default store;