import {Dispatch} from 'redux'
import {authAPI} from "../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAppStatusAC} from '../app/app-reducer'

const initialState = {
    isLoggedIn: false
}


const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLogged: (state, action: PayloadAction<{value:boolean}>) => {
            state.isLoggedIn = action.payload.value
        }
    }

})
export const setIsLoggedInAC = slice.actions.setIsLogged
export const authReducer = slice.reducer

// thunks
export const loginTC = (data: any) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value:false}))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC>


