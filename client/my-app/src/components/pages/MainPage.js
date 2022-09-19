import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {setPath} from '../login/loginSlice'

const MainPage = () => {
    const dispatch = useDispatch();
    let location = useLocation();
    const path = useSelector(state => state.login.path)
    // console.log(location.pathname);
    if(location.pathname === '/main') {
        dispatch(setPath(location.pathname));
    }

    return(
        <div>Hello world</div>
    )
}

export default MainPage