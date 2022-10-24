import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";


const loginAdapter = createEntityAdapter();

const initialState = loginAdapter.getInitialState({
    status: 'not',
    fullData: null,
    person: null
});


const personalDateSlice = createSlice({
    name: 'personalDate',
    initialState,
    reducers: {
        getPerson: (state, action) => {
            state.person = action.payload
        },
        sendStatus: (state, action ) => {
            state.status = action.payload
        },

        setStatusData: (state, action) => {
            state.fullData = action.payload
        }
    }
})


const {actions, reducer} = personalDateSlice;
export default reducer


export const {
    sendStatus,
    setStatusData,
    getPerson
} = actions;