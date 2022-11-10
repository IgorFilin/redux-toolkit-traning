import {Dispatch} from "redux";
import {setIsLoggedInAC} from "./authReducer";
import {authAPI} from "../api/todolists-api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}

const slice = createSlice({
    name:'app',
    initialState,
    reducers:{
        setAppError:(state,action:PayloadAction<string | null>)=> {
             state.error = action.payload
        },
        setStatus:(state,action:PayloadAction<RequestStatusType>)=>{
            state.status = action.payload
        },
        setInitialized:(state,action:PayloadAction<boolean>)=>{
            state.isInitialized = action.payload
        }
    }
})

export const appReducer = slice.reducer

export const setInitializedAC = slice.actions.setInitialized
export const setAppErrorAC = slice.actions.setAppError
export const setAppStatusAC = slice.actions.setStatus


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setInitializedAC(true))
            dispatch(setIsLoggedInAC({value:true}));
        } else {
            dispatch(setInitializedAC(true))
        }
    })
}