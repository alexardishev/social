import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";


const loginAdapter = createEntityAdapter();

const initialState = loginAdapter.getInitialState({
    status: 'not authorized',
    msg: '',
    token: false,
    path: ''
});


const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.status = 'done'
            state.msg = 'Успешно авторизован'
            state.token = action.payload
        },
        registersUser:(state, action) => {
            state.status =  action.payload
        },
        doubleUser: (state, action) => {
            state.status = 'double'
            state.msg = action.payload
        },
        exitUser: (state, action) => {
            state.token = false
        },
        setPath: (state, action) => {
            state.path = action.payload;
        }

    }
});

const {actions, reducer} = loginSlice;
export const selectors = loginAdapter.getSelectors()
export default reducer


export const {
    loginUser,
    doubleUser,
    registersUser,
    exitUser, 
    setPath
} = actions;