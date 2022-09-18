import Container from "../container/Container";
import Navbar from "../navbar/navbar";
import LinkBar from "../link/link";
import Logos from "../logo/logo";
import Cookies from 'js-cookie'
import {exitUser} from '../login/loginSlice'
import { useDispatch, useSelector } from 'react-redux';

const HelloPage = (props) => {
    const token2 = useSelector(state => state.login.token)
    const dispatch = useDispatch();

      const exit = () => {
        Cookies.remove("token")
        dispatch(exitUser())
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