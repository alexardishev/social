import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";


const authAdapter = createEntityAdapter();

const initialState = authAdapter.getInitialState({
    authStatus: "none",
    msg: ''
});


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        createUser: (state, action) => {
            state.authStatus = 'done'
            authAdapter.addOne(state, action.payload)
            state.msg = 'Пользователь зарегистрирован! Пожалуйста подтвердите почту.'
        },
        registersUser:(state, action) => {
            state.authStatus =  action.payload
        },
        doubleUser: (state, action) => {
            state.authStatus = 'double'
            state.msg = action.payload
        }

    }
});

const {actions, reducer} = authSlice;
export const selectors = authAdapter.getSelectors()
export default reducer


export const {
    createUser,
    doubleUser,
    registersUser
} = actions;