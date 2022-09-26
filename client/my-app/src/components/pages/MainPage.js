import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {setPath} from '../login/loginSlice'
import ContainerWhite from "../container/ContainerWhite";
import Wrapper1200 from "../wrapper/wrapper1200";
import Button from "../button/Button";
import Man from './man.jpg'
import './MainPage.scss'
import MenuTop from "../menu/menu";

const MainPage = () => {
    const dispatch = useDispatch();
    let location = useLocation();
    // const path = useSelector(state => state.login.path)
    if(location.pathname === '/main') {
        dispatch(setPath(location.pathname));
    }

    return(
        <>
        <ContainerWhite>
            
            <MenuTop/>
            <Wrapper1200>
            <div className='wrapperContent'>
                <h1>Добро пожаловать Ардышев Александр!</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo asperiores, libero blanditiis non soluta natus. Beatae molestiae omnis ex odio. Quod amet commodi velit, facere dolores vero fugit sit dolor!
                </p>
            <Button
                className="glow-on-hover"
                name= "Заполнить анкету"
                />
            </div>

            <div className='wrapperContent'>
                <div className="wrapper_img" >
                    <img className="wrapper_img_image" src={Man} alt="man" />
                </div>
            </div>

               

            </Wrapper1200>
        </ContainerWhite>
        </>
    )
}

export default MainPage