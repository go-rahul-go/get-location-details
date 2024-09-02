import { createSlice } from "@reduxjs/toolkit";


const STATUSES = Object.freeze({
    idle: "idle",
    loading: "loading",
    error: "error"
})

const locationSlice = createSlice({
    name: "location",
    initialState: {
        data: JSON.parse(localStorage.getItem("data")) || {},
        status: STATUSES.idle
    },
    reducers: {
        add(state, action) {
            localStorage.setItem("data", JSON.stringify(action.payload))
            state.data = action.payload
        },
        changeTheme(state, action) {
            localStorage.setItem("theme", JSON.stringify(action.payload))
            state.theme = action.payload
        },
        setStatus(state, action) {
            state.status = action.payload;
        }
    }
})


export const { add, setStatus } = locationSlice.actions;

export default locationSlice.reducer;



//thunks middleware

export function getLocation() {
    return async function getUserLocation(dispatch, getState) {
        dispatch(setStatus(STATUSES.loading));
        try {
            let resp = await fetch("https://api.ipify.org?format=json");
            let result = await resp.json();

            console.log(result);

            let data = await fetch(`https://ipinfo.io/${result.ip}/geo`);
            let info = await data.json();

            dispatch(add(info))
            console.log(info)

            dispatch(setStatus(STATUSES.idle))

        }
        catch (error) {
            console.log("something went wrong");
            dispatch(setStatus(STATUSES.error))
        }
    }
}