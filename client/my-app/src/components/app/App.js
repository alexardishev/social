import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { useEffect } from 'react';
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux';
import {loginUser} from '../login/loginSlice'
import {useHttp} from '../../hooks/https.hook';


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

  const checkAuth = async () => {
    request(`http://localhost:5000/api/user/auth`, "GET", null, {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
    .then(res => {
      if(res.token) {
        dispatch(loginUser(true))
      }

    })
    .catch(dispatch(loginUser(false)))
  }

  useEffect(()=> {
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
