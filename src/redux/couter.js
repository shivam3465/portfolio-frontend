import { createSlice } from "@reduxjs/toolkit";

const counterSlice=createSlice({
    name: 'counter',
    initialState: {
        count: 0,
        name: "fugga",
        email: "fugga@gmail.com"
    },
    reducers: {
        increase: (state)=>{
            state.count++;
        },
        decrease: (state)=>{
            state.count--;
        },
        changeName: (state,action)=>{
            state.name = action.payload;
        },
        changeEmail: (state,action)=>{
            state.email = action.payload;
        }
    }
})

export const {increase, decrease,changeEmail,changeName} =counterSlice.actions;

export const counterReducer=counterSlice.reducer;