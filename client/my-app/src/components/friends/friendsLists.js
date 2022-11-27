import {useHttp} from '../../hooks/https.hook';
import { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import {loadFriends } from './friendsListsSlice'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux';
import ContainerWhite from '../container/ContainerWhite';
import Wrapper1200 from '../wrapper/wrapper1200';
import Button from '../button/Button';
import {setPath} from '../login/loginSlice'



const Friends = () => {
    
    
    let location = useLocation();
    const dispatch = useDispatch();
    const {request} = useHttp();
    const token = Cookies.get("token")
    const decodeToken = jwt_decode(token)
    const friendLists = useSelector(state => state.frineds.friendList);
    console.log(friendLists)
    const getFriendsNotAproove = () => {
        request(`http://localhost:5000/api/user/friendList/${decodeToken.id}`).
        then((res)=> {
            dispatch(loadFriends(res));

        })


    }
    const setPathOnLoad =()=> {
        dispatch(setPath(location.pathname));
}

    useEffect(()=> {
        setPathOnLoad();
        getFriendsNotAproove();
    }, [])
    const list = friendLists.map((item)=> {
        return(
            <>
            <div>
                <div>{item.firstName}</div>
                <div>{item.middleName}</div>
                <div>{item.lastName}</div>
                 <div>{item.sex ==='male'? 'Мужской' : 'Женский'}</div>
                 <Button
                type="submit"
                className={"glow-on-hover"}
                name= "Добавить в друзья"
                />
            </div>
              
            </>
          
          
        )
    })
    return (
        
        <ContainerWhite>
            <Wrapper1200>
                {list}
            </Wrapper1200>
                
        </ContainerWhite>


    )
}

export default Friends