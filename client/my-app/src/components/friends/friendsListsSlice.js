import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";


const friendsApadter = createEntityAdapter();


const initialState = friendsApadter.getInitialState({
    friendList: []
});


const friendsListsSlice = createSlice(
    {
        name: 'frineds',
        initialState,
        reducers: {
            loadFriends: (state, action)=> {
                state.friendList = action.payload;
            }
        }

    });


const {actions, reducer} = friendsListsSlice;
export default reducer

export const {
    loadFriends
} = actions;