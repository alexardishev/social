import { configureStore } from "@reduxjs/toolkit"
import auth from "../components/auth/authSlice"
import login from "../components/login/loginSlice"
import personalDate from '../components/setPersonalData/personalDateSlice'
import frineds from '../components/friends/friendsListsSlice'



const stringMiddleware = (store) => (dispatch) => (action) => {
    if(typeof action === 'string') {
         return dispatch({
              type: action
         })
    }
    return dispatch(action);
};

const enhanser = (createStore) => (...args) => {
    const store = createStore(...args);

    const oldDispatch = store.dispatch;
    store.dispatch = (action) => {
         if(typeof action === 'string') {
              return oldDispatch({
                   type: action
              })
         }
         return oldDispatch(action);
    }
     return store;
}

const store = configureStore({
    reducer : {auth, login, personalDate, frineds},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
})


export default store;