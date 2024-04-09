import weather from "./weather";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        weather,
    },
})

export default store