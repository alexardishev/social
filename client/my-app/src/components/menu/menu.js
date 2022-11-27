import { useState, useRef } from 'react'
import LinkBar from '../link/link';

import './menu.scss'
import Logos from "../logo/logo";


const MenuTop = (props) => {

    const [activeMenu, setActiveMenu] = useState(false);
    // const [className, setClassName] = useState('noActiveMenu');
    const myRef = useRef();

    const activate = async () => {
        console.log('qqqq')
        setActiveMenu(!activeMenu);
        // activeMenu ? setClassName('activeMenu') : setClassName('noActiveMenu');

    }

    const checkRef = (e) => {
        if(e.target == myRef.current && className=== 'activeMenu') {
            console.log('111')
            className = 'noActiveMenu'
            setActiveMenu(false)
            console.log(className)
        }
    }

    let className = activeMenu ? 'activeMenu' :'noActiveMenu';
    return (
        <>
    <div onClick={checkRef} ref={myRef} className={activeMenu ? 'wrapActiveMenu' : 'wrap'}>
      
      </div>


    <div onClick={activate} className={className === 'activeMenu' ? 'noHumburger' : 'humburger'}>
        <svg width="40" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 18V20H5V18H16ZM21 11V13H3V11H21ZM19 4V6H8V4H19Z" fill="#222222"/>
        </svg>
    </div >

       <div className={className}>
        <div>
                            <ul>
                                <li><a href="/friendLists">Друзья</a></li>
                                <li><LinkBar
                                    path='form'
                                    nameLink='Анкета'
                                    classNameSecond= 'marginNone'
                                />
                                 </li>

                                <li><a href="#">Личные сообщения</a></li>
                                <li><a href="#">Случайный чат</a></li>
                                <li><a href="#">Избранное</a></li>
                            </ul>
        </div>
                         
                            
                            <div>
                                <Logos/>
                            </div>
    </div>
        
        </>
     
    )
}

export default MenuTop