import {BrowserRouter as Router, Route, Switch, useLocation} from 'react-router-dom'
import { useEffect, useState} from 'react';
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux';
import {loginUser} from '../login/loginSlice'
import {useHttp} from '../../hooks/https.hook';
import { io } from "socket.io-client";
import jwt_decode from 'jwt-decode'

import HelloPage from '../pages/HelloPage';
import RegPage from '../pages/RegPage';
import LoginPage from '../pages/LoginPage';
import MainPage from '../pages/MainPage';
import MessagePage from '../pages/MessagePage';

import './app.scss';

function App() {
  const dispatch = useDispatch();
  const {request} = useHttp();
  const token = Cookies.get("token")
  const stateTokenStatus = useSelector(state => state.token)
  const path = useSelector(state => state.login.path)
  const [f5, setf5] = useState(false);
console.log(path);
  const socket = io("http://localhost:5000");

  socket.on("connect", () => {
    console.log(socket.id); 
    socket.emit('userAuth', token ?jwt_decode(token): null)
    
    
    // x8WIv7-mJelg7on_ALbx
  });

  socket.on('hello', (arg)=> {
      console.log(arg)
  })


  const offlineUser = () => {
    socket.emit('disconnectUser', 'reload')
  }
  const checkAuth = async () => {
    request(`http://localhost:5000/api/user/auth`, "GET", null, {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    .then(res => {
      if(res.token) {
        dispatch(loginUser(true))
  
      }

    })
    .catch(dispatch(loginUser(false)))

  }

  if(path === "/main" && !f5){
      setf5(!f5);
  }

  useEffect(()=> {
      offlineUser();
      checkAuth();
  },[])

  return (
    <Router>
      <main className="app">
        <div className="content">
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
          </Switch>
        </div>
      </main>
    </Router>
  

  );
}

export default App;
