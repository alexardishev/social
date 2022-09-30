import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {setPath} from '../login/loginSlice'

import ContainerWhite from '../container/ContainerWhite';
import Wrapper1200 from '../wrapper/wrapper1200';
import Form from '../form/form';
import Input from '../input/input';
import Button from '../button/Button';
import Spinner from '../spinner/Spinner';
import FormYourselfImg from './form.jpg'

const FormYourself = () => {
    let location = useLocation();
    const path = useSelector(state => state.login.path)
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailDirty, setEmailDirty] = useState("");
    const [passwordDirty, setPasswordDirty] = useState("");
    const [emailError, setEmailError] = useState("Email не может быть пустым");
    const [passwordError, setPasswordError] = useState("Пароль не может быть пустым");
    const [formValid, setFormValid]= useState(false);

    const setPathOnLoad =()=> {
            dispatch(setPath(location.pathname));
    }
    useEffect(()=> {
        setPathOnLoad();
    },[])
    
    useEffect(()=> {
        if(emailError || passwordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    },[emailError, passwordError] )

    // const creatingUser = async (e) => {
    //     // e.preventDefault();

    //     const userLogin = {
    //         email: email,
    //         password: password
    //     }

    //     await dispatch(registersUser('registers'))

    //     request(`http://localhost:5000/api/user/login`, 'POST', JSON.stringify(userLogin)).
    //     then(res => {
    //             if (!res.message) {
    //                 console.log(res.token)
    //                 // document.cookie = `token=${res.token}`
    //                 Cookies.set("token", res.token)
    //                 Cookies.set("email", userLogin.email)

    //                 console.log(document.cookie)
    //                 dispatch(loginUser(true))
    //             } else {
    //                 dispatch(doubleUser(res.message))
    //             }
    //             setEmail('');
    //             setPassword('');
    //     })

    // }
    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email': 
                setEmailDirty(true)
                console.log(emailDirty)
                break
            case 'password':
                setPasswordDirty(true)
                break
        }
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Некорректный email')
        } else {
            setEmailError("")
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        const re = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/
        if(!re.test(String(e.target.value))) {
            setPasswordError(`Пароль должен быть не менее 8 символов. Иметь одну заглавную и одну строчную букву. Иметь спецсимвол`)
        if(!e.target.value) {
            setPasswordError(`Пароль не может быть пустым`)
        }
        } else {
            setPasswordError("")
        }
    }






    return (
        <>
            <ContainerWhite>
                <Wrapper1200>
                <Form 
                    classNameWrapper='wrapper'
                    // submit={creatingUser}
                    classNameForm="wrapper_form"
                
                    >
                                {(emailDirty && emailError) && <div className='dangerNotification' style={{color: 'red'}}>{emailError}</div>}
                                <Input
                                onBlur={e=> blurHandler(e)}
                                wrapperClassName="text-field text-field_floating-3"
                                type="email" 
                                name="email" 
                                className="text-field__input"
                                id="email"
                                placeholder="Введите адрес почты"
                                value={email}
                                change={(e)=> emailHandler(e)}
                                labelClassName="text-field__label"
                                label='Имя'
                                htmlFor="email"
                                />

                                <Input
                                onBlur={e=> blurHandler(e)}
                                wrapperClassName="text-field text-field_floating-3"
                                type="text" 
                                name="email" 
                                className="text-field__input"
                                id="email"
                                placeholder="Введите адрес почты"
                                value={email}
                                change={(e)=> emailHandler(e)}
                                labelClassName="text-field__label"
                                label='Фамилия'
                                htmlFor="email"
                                />

                                <h3>Выберите свой пол</h3>
                                <div>
                                
                                {(passwordDirty && passwordError) && <div className='dangerNotification' style={{color: 'red'}}>{passwordError}</div>}
                                <Input
                                onBlur={e=> blurHandler(e)}
                                wrapperClassName=""
                                type="radio" 
                                name="male" 
                                className=""
                                id="password"
                                value={password}
                                change={(e)=> passwordHandler(e)}
                                labelClassName="text-field__label"
                                label="Мужчина"
                                htmlFor='male'
                                />

                                {(passwordDirty && passwordError) && <div className='dangerNotification' style={{color: 'red'}}>{passwordError}</div>}
                                <Input
                                onBlur={e=> blurHandler(e)}
                                wrapperClassName=""
                                type="radio" 
                                name="male" 
                                className=""
                                id="password"
                                value={password}
                                change={(e)=> passwordHandler(e)}
                                labelClassName="text-field__label"
                                label="Мужчина"
                                htmlFor='male'
                                />
                                </div>
                               
                                {(passwordDirty && passwordError) && <div className='dangerNotification' style={{color: 'red'}}>{passwordError}</div>}
                                <Input
                                onBlur={e=> blurHandler(e)}
                                wrapperClassName="text-field text-field_floating-3"
                                type="password" 
                                name="password" 
                                className="text-field__input"
                                id="password"
                                placeholder="Введите пароль"
                                value={password}
                                change={(e)=> passwordHandler(e)}
                                labelClassName="text-field__label"
                                label="Отчество"
                                htmlFor='password'
                                />
                                                                {(passwordDirty && passwordError) && <div className='dangerNotification' style={{color: 'red'}}>{passwordError}</div>}
                                <Input
                                onBlur={e=> blurHandler(e)}
                                wrapperClassName="text-field text-field_floating-3"
                                type="password" 
                                name="password" 
                                className="text-field__input"
                                id="password"
                                placeholder="Введите пароль"
                                value={password}
                                change={(e)=> passwordHandler(e)}
                                labelClassName="text-field__label"
                                label="Пароль"
                                htmlFor='password'
                                />
                                                                {(passwordDirty && passwordError) && <div className='dangerNotification' style={{color: 'red'}}>{passwordError}</div>}
                                <Input
                                onBlur={e=> blurHandler(e)}
                                wrapperClassName="text-field text-field_floating-3"
                                type="password" 
                                name="password" 
                                className="text-field__input"
                                id="password"
                                placeholder="Введите пароль"
                                value={password}
                                change={(e)=> passwordHandler(e)}
                                labelClassName="text-field__label"
                                label="Пароль"
                                htmlFor='password'
                                />
                                                                {(passwordDirty && passwordError) && <div className='dangerNotification' style={{color: 'red'}}>{passwordError}</div>}
                                <Input
                                onBlur={e=> blurHandler(e)}
                                wrapperClassName="text-field text-field_floating-3"
                                type="password" 
                                name="password" 
                                className="text-field__input"
                                id="password"
                                placeholder="Введите пароль"
                                value={password}
                                change={(e)=> passwordHandler(e)}
                                labelClassName="text-field__label"
                                label="Пароль"
                                htmlFor='password'
                                />
                                <Button
                                disabled={!formValid}
                                type="submit"
                                className={formValid ? "glow-on-hover" : "btn1"}
                                name= "Сохранить"
                                />
                    </Form>


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

export default FormYourself;
