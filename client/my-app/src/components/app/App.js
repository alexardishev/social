import {BrowserRouter as Router, Route, Switch, Redirect, useLocation} from 'react-router-dom'
import { useEffect, useState} from 'react';
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux';
import {loginUser} from '../login/loginSlice'
import {useHttp} from '../../hooks/https.hook';
import { io } from "socket.io-client";
import jwt_decode from 'jwt-decode'

import MenuTop from '../menu/menu';
import HelloPage from '../pages/HelloPage';
import RegPage from '../pages/RegPage';
import LoginPage from '../pages/LoginPage';
import MainPage from '../pages/MainPage';
import MessagePage from '../pages/MessagePage';
import FormYourself from '../pages/FormYourself';


import './app.scss';

function App() {
  const dispatch = useDispatch();
  const {request} = useHttp();
  const token = Cookies.get("token")
  const email = Cookies.get("email")
  const stateTokenStatus = useSelector(state => state.login.token)
  const path = useSelector(state => state.login.path)
  const [f5, setf5] = useState(false);
  
  const socket = io("http://localhost:5000");

  socket.on("connect", () => {
    socket.emit('userAuth', token && stateTokenStatus ?jwt_decode(token): null)
    
  });
  

  const redirectToAuth = () => {
    if(!token) {
      return <Redirect push to="/"/>
    } 
    
  }


  const checkAuth = async () => {
    request(`http://localhost:5000/api/user/auth`, "GET", null, {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, 'useremail' : `${email}`})
    .then(res => {
      if(res.token) {
        dispatch(loginUser(true))

  
      } else {
        dispatch(loginUser(false))
      }

    })
    .catch(()=> {
      dispatch(loginUser(false))
    })

  }

  if(path === "/main" && !f5){
      setf5(!f5);
  }
  

  useEffect(()=> {
    redirectToAuth();
      checkAuth();
  },[])
  
  return (
    <Router>
      {redirectToAuth()}
      <main className="app">
        <div className="content">
          {token && path && path !== '' ?<MenuTop/>: null}
          <Switch>
              <Route exact path="/">
                  <HelloPage/>
              </Route>
              <Route exact path="/registration">
                  <RegPage/>
              </Route>
              <Route exact path="/login">
                  <LoginPage/>
              </Route>
              <Route exact path="/main">
                  <MainPage/>
              </Route>
              <Route exact path="/message">
                  <MessagePage/>
              </Route>
              <Route exact path="/form">
                  <FormYourself/>
              </Route>
          </Switch>
        </div>
      </main>
    </Router>
  

  );
}

export default App;
