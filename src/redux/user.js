import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name: "user",
    initialState:{
        logined: false,
        baseUrl: "http://localhost:4000/api/v1",
        user: {},
        desc: "",
        about: "",
        skills: [],
        coding: [],
        project: []
    },
    reducers:{
        changeuser: (state,action)=>{
            state.user_name = action.payload;
        },
        changeemail: (state,action)=>{
            state.user_email = action.payload;
        },
        changeid: (state,action)=>{
            state.user_id =action.payload;
        },
        setLogined: (state,action)=>{
            state.logined = action.payload;
        },
        setDesc: (state,action)=>{
            state.desc = action.payload;
        },
        setAbout: (state,action)=>{
            state.about=action.payload;
        },
        setSkills: (state,action)=>{
            state.skills=action.payload;
        },
        setCoding: (state,action)=>{
            state.coding=action.payload;
        },
        setUser: (state,action)=>{
            state.user = action.payload;
        },
        setProject: (state,action)=>{
            state.project = action.payload;
        },
    }
})

export const {changeuser, changeemail, changeid,setLogined,setDesc,setAbout,setSkills,setUser,setCoding,setProject}=userSlice.actions;
export const userReducer=userSlice.reducer;
