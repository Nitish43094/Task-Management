import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userData : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    loading : false,
    signupData :null,
}

const userSlice = createSlice({
    name:"user",
    initialState : initialState,
    reducers :{
        setUser : (state,action) =>{
            state.userData = action.payload;
        },
        setloading : (state,action) =>{
            state.loading = action.payload;
        },
        setToken : (state,action)=>{
            state.token = action.payload;
        },
        setSignupdata : (state,action)=>{
            state.signupData = action.payload;
        }
    }
})

export const {setUser,setloading,setToken,setSignupdata} = userSlice.actions;
export default userSlice.reducer;