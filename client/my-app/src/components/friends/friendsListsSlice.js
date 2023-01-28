import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { StaticRouter } from "react-router-dom";


const friendsApadter = createEntityAdapter();


const initialState = friendsApadter.getInitialState({
    friendList: [],
    friendListAproove: [],
    relationFriend: [],
    aprooveStatus: [],
    friendsNeedAproove: [],
});


const friendsListsSlice = createSlice(
    {
        name: 'frineds',
        initialState,
        reducers: {
            loadFriends: (state, action)=> {
                state.friendList = action.payload;
            },
            loadFriendsAproove: (state, action) => {
                state.friendListAproove = action.payload;
            },
            addRelationFriend: (state, action) => {
                state.relationFriend = action.payload;
            },
            aprooveStatus:(state, action) => {
                state.aprooveStatus = action.payload;
            },
            friendsNeedAproove: (state, action) => {
                state.friendsNeedAproove = action.payload;
            }
        }

    });


const {actions, reducer} = friendsListsSlice;
export default reducer

export const {
    loadFriends,
    loadFriendsAproove,
    addRelationFriend,
    aprooveStatus,
    friendsNeedAproove
} = actions;