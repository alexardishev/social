import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {setPath} from '../login/loginSlice'
import { sendStatus,setStatusData,  getPerson} from './personalDateSlice';
import {useHttp} from '../../hooks/https.hook';
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'

import ContainerWhite from '../container/ContainerWhite';
import Wrapper1200 from '../wrapper/wrapper1200';
import Form from '../form/form';
import Input from '../input/input';
import Button from '../button/Button';
import Spinner from '../spinner/Spinner';
import FormYourselfImg from './form.jpg'


const SetPersonalDate = () => {
    const {request} = useHttp();
    let location = useLocation();
    const dispatch = useDispatch();
    const status = useSelector(state => state.personalDate.status)
    const person = useSelector(state => state.personalDate.person)
    const token = Cookies.get("token")
    const decodeToken = jwt_decode(token)
    let fullData = useSelector(state => state.personalDate.fullData);
    console.log(fullData);
console.log(decodeToken);
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [sex, setSex] = useState("");
    const email = Cookies.get('email')

    const setPathOnLoad =()=> {
            dispatch(setPath(location.pathname));
    }

    
    const getFullData = async (e) => {
        request(`http://localhost:5000/api/user/${email}`).
        then( res => {
            dispatch(getPerson(res))
            dispatch(setStatusData(res.isFullData))
            setFirstName(res.firstName)
            setMiddleName(res.middleName)
            setLastName(res.lastName)
            setSex(res.sex)

        })
    }

    const setFullData  = async (e) => {

        dispatch(sendStatus('loading'))

        e.preventDefault();
        const data = {
            firstName,
            middleName,
            lastName,
            email,
            sex
        }

        request(`http://localhost:5000/api/forms/upadatePersonal`, 'POST', JSON.stringify(data), {'Content-Type': 'application/json'}, true).
        then(res => {
                console.log(res)
                dispatch(sendStatus('not'))
                getFullData();
                setFirstName('');
                setMiddleName('');
                setLastName('');
                setSex('');                

        })

    }


    useEffect(()=> {
        setPathOnLoad();
        getFullData();
    },[])
    // fullData = person.isFullData
    const content = status === 'loading'? <Spinner/> : <Form 
    classNameWrapper='wrapper'
    submit={setFullData}
    classNameForm="wrapper_form"
>


                <Input
                // onBlur={e=> blurHandler(e)}
                wrapperClassName="text-field text-field_floating-3"
                required
                type="text" 
                name="firstName" 
                className="text-field__input"
                id="firstName"
                placeholder="Введите адрес почты"
                value={firstName}
                change={(e)=> setFirstName(e.target.value)}
                labelClassName="text-field__label"
                label='Имя'
                htmlFor="firstName"
                />

                <Input
                // onBlur={e=> blurHandler(e)}
                wrapperClassName="text-field text-field_floating-3"
                type="text" 
                name="lastname" 
                className="text-field__input"
                id="lastname"
                placeholder="Введите фамилию"
                value={lastName}
                change={(e)=> setLastName(e.target.value)}
                labelClassName="text-field__label"
                label='Фамилия'
                htmlFor="lastname"
                />
                <Input
                // onBlur={e=> blurHandler(e)}
                wrapperClassName="text-field text-field_floating-3"
                type="text" 
                name="middleName" 
                className="text-field__input"
                id="middleName"
                placeholder="Введите отчество"
                value={middleName}
                change={(e)=> setMiddleName(e.target.value)}
                labelClassName="text-field__label"
                label="Отчество"
                htmlFor='middleName'
                />
                <h3 className='radioTittle'>Выберите свой пол</h3>
                <div className='radio'>
                        
                        <Input
                        // onBlur={e=> blurHandler(e)}
                        wrapperClassName="wrapperRadio"
                        disabled={fullData}
                        checked={sex === 'male' ? true : false}
                        type="radio" 
                        name="sex" 
                        className="inputRadio"
                        id="male"
                        value='male'
                        change={(e)=> setSex(e.target.value)}
                        labelClassName="text-field__label"
                        label="Мужчина"
                        htmlFor='male'
                        />

                
                        <Input
                        // onBlur={e=> blurHandler(e)}
                        wrapperClassName="wrapperRadio"
                        disabled={fullData}
                        type="radio" 
                        name="sex" 
                        className="inputRadio"
                        id="female"
                        value='famale'
                        change={(e)=> setSex(e.target.value)}
                        labelClassName="text-field__label"
                        label="Женщина"
                        htmlFor='female'
                />
                </div>
                <Button
                // click={clearState}
                className="glow-on-hover"
                name= "Сохранить"
                />
    </Form> 

// const fullDataContent = 

    return (
        <>
            <ContainerWhite>
                <Wrapper1200>
               

                    {content}
                    <div className='wrapperContent'>
                        <div className="wrapper_img" >
                            <img className="wrapper_img_image" src={FormYourselfImg} alt="man" />
                        </div>
                    </div>

                    
                </Wrapper1200>

            </ContainerWhite>

        </>
    )
}

export default SetPersonalDate;