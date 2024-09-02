import { configureStore } from "@reduxjs/toolkit";
import localReducer from "./locationSlice"


const store=configureStore({
    reducer:{
        location:localReducer
    }
})


export default store;