import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:"feed",
    initialState:{
        loading:false,
        feedData:[],
    },
    reducers : {
        setFeed : (state,action)=>{
            state.feedData = action.payload;
        },
        setloading : (state,action) =>{
            state.loading = action.payload;
        }
    }
})

export const {setFeed,setloading} = feedSlice.actions;
export default feedSlice.reducer;