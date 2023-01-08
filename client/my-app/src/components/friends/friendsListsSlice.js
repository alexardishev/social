import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";


const friendsApadter = createEntityAdapter();


const initialState = friendsApadter.getInitialState({
    friendList: [],
    friendListAproove: [],
    relationFriend: [],
    aprooveStatus: [],
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
            }
        }

    });


const {actions, reducer} = friendsListsSlice;
export default reducer

export const {
    loadFriends,
    loadFriendsAproove,
    addRelationFriend,
    aprooveStatus
} = actions;