import {useHttp} from '../../hooks/https.hook';
import { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import {loadFriends, loadFriendsAproove, addRelationFriend, aprooveStatus} from './friendsListsSlice'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux';
import ContainerWhite from '../container/ContainerWhite';
import Wrapper1200 from '../wrapper/wrapper1200';
import Button from '../button/Button';
import {setPath} from '../login/loginSlice'
import './friend.scss'
import friend from './friends.jpg'
import holder from './image_holder.jpg'

const Friends = () => {
    
    
    let location = useLocation();
    const dispatch = useDispatch();
    const {request} = useHttp();
    const token = Cookies.get("token")
    const decodeToken = jwt_decode(token)
    const friendLists = useSelector(state => state.frineds.friendList);
    const friendListsAproove = useSelector(state => state.frineds.friendListAproove);
    const aprooveStatusState = useSelector(state => state.frineds.aprooveStatus);

    const getFriendsNotAproove = () => {
        request(`http://localhost:5000/api/user/friendList/${decodeToken.id}`).
        then((res)=> {
            dispatch(loadFriends(res));

        })


    }

    const addFriend = (friendId) => {

        const addedFriend = {
            id: decodeToken.id,
            friendId
        }

        request(`http://localhost:5000/api/user/friendList/add`, 'POST', JSON.stringify(addedFriend)).
        then((res) => dispatch(addRelationFriend(res))).then(()=> getAprooveStatus()).catch(err => console.log(err))
    }
     
    const getFriandsAproove = () => {
        request(`http://localhost:5000/api/user/friendListAproove/${decodeToken.id}`).
        then((res) => {
            dispatch(loadFriendsAproove(res));
        })
    }


    const getAprooveStatus = () => {
        request(`http://localhost:5000/api/user/friendList/aprooveStatus`).
        then((res)=> dispatch(aprooveStatus(res)))
    }
    const setPathOnLoad =()=> {
        dispatch(setPath(location.pathname));
}

    useEffect(()=> {
        setPathOnLoad();
        getAprooveStatus();
        getFriandsAproove();
        getFriendsNotAproove();
    }, [])
    const list = friendLists.map((item)=> {
        return(
            <>
            <div className='friend_container_item'>
                <div>
                    <div>{item.firstName}  {item.middleName} {item.lastName}  </div>
                    <div> {item.sex ==='male'? 'Пол: Мужской' : 'Пол: Женский'}</div>
                    <Button
                    className={"glow-on-hover"}
                    name= {aprooveStatusState.find(aprooveItem => aprooveItem.friend_id == item.id) ? 'Ожидает подтверждения' : 'Добавить в друзья'}
                    click = {()=> addFriend(item.id)}
                    disabled= {aprooveStatusState.find(aprooveItem => aprooveItem.friend_id == item.id)}
                    />
                </div>
                <div className='avatarUserWrapper'>
                    <img className='avatarUserImg' src={holder} alt="image holder" />
                </div>
               

            </div>
              
            </>
          
          
        )
    })

    const listAproove = friendListsAproove.map((item)=> {
        return(
            <>
            <div className='friend_container_item aproove'>
                <div>
                    <div>{item.firstName}  {item.middleName} {item.lastName}  </div>
                    <div> {item.sex ==='male'? 'Пол: Мужской' : 'Пол: Женский'}</div>
                    <Button
                    type="submit"
                    className={"glow-on-hover"}
                    name= "Удалить из друзей"
                    />
                </div>
                <div className='avatarUserWrapper'>
                    <img className='avatarUserImg' src={holder} alt="image holder" />
                </div>
               

            </div>
              
            </>
          
          
        )
    })


    return (
        
        <ContainerWhite>
            <div className='h1_friend_container'>
            <h1>Список Друзей</h1>
            </div>
            <Wrapper1200>
            <div className='friend_container'>
                {listAproove}
                {list}
                </div>
                <div className='wrapper_to_img'>
                    <img src={friend} alt="friends" />
                </div>
                
              
            </Wrapper1200>
                
        </ContainerWhite>


    )
}

export default Friends