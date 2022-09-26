import Container from "../container/Container";
import Navbar from "../navbar/navbar";
import LinkBar from "../link/link";
import Logos from "../logo/logo";
import { io } from "socket.io-client";
import Cookies from 'js-cookie'
import {exitUser} from '../login/loginSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState} from 'react';

const HelloPage = (props) => {
    const token2 = useSelector(state => state.login.token)
    const dispatch = useDispatch();
    const email = Cookies.get("email")

    const socket = io("http://localhost:5000");



      const exit = () => {
        socket.emit('forceDisconnect', email);
        Cookies.remove("token")
        dispatch(exitUser())
        // window.location.reload();

      }



    console.log(token2);
    return(
        <Container>
            <div className="wrapper">
                <Logos/>
                <Navbar>

{ token2 ?  

             <>
             <LinkBar
            path=''
            click={exit}
            nameLink='Выход' />
            </> :
            
            <>

            <LinkBar
            path='registration'
            nameLink='Зарегистрироваться' />
            <LinkBar
            path='login'
            nameLink='Войти' />              
            </>}
            <LinkBar
            path='registration'
            nameLink='Поддержка'
            />
                </Navbar>
            </div>
        
        </Container>
    )

}

export default HelloPage;