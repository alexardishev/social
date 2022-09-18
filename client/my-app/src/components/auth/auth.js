import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {useHttp} from '../../hooks/https.hook';
import {createUser, doubleUser, registersUser} from './authSlice'
import Cookies from 'js-cookie'
import {Link, Redirect} from 'react-router-dom'

// import store from '../../store';

import Form from '../form/form';
import Input from '../input/input';
import Button from '../button/Button';
import Spinner from '../spinner/Spinner';
import Notification from '../notification/Notification';


import './auth.scss';

const Auth = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailDirty, setEmailDirty] = useState("");
    const [passwordDirty, setPasswordDirty] = useState("");
    const [emailError, setEmailError] = useState("Email не может быть пустым");
    const [passwordError, setPasswordError] = useState("Пароль не может быть пустым");
    const [formValid, setFormValid]= useState(false);

    const dispatch = useDispatch();
    const {request} = useHttp();
    const authStatus  = useSelector(state => state.auth.authStatus)
    const auth  = useSelector(state => state.auth.msg)
    const token = useSelector(state => state.login.token)

    // const entities  = selectors.selectAll(store.getState().auth)    


    useEffect(()=> {
        if(emailError || passwordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    },[emailError, passwordError] )


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

    const creatingUser = async (e) => {
        e.preventDefault();

        const newUser = {
            email: email,
            password: password
        }

        await dispatch(registersUser('registers'))

        request(`http://localhost:5000/api/user/registration`, 'POST', JSON.stringify(newUser)).
        then(res => {

                if (!res.message) {
                    dispatch(createUser({
                        id: uuidv4(),
                        token: res[0],
                        msg: res[1]
                    }))
                } else {
                    dispatch(doubleUser(res.message.msg))
                }
                setEmail('');
                setPassword('');
        })

    }
    const backPage  = (e) => {
        e.preventDefault();
         dispatch(registersUser('registers'))
        
        setTimeout(()=> {
            dispatch(registersUser('none'))
        }, 1000)

    }

    const clearState = () => {
        dispatch(registersUser('none'))
    }

    const checkToken = () => {
        if(token) {
           return <Redirect push to="/main"/>
        }

    }

    const content = authStatus === 'registers' ? <div className='wrapper'><Spinner/></div>  : 
    <>
    <Form 
    classNameWrapper='wrapper'
    submit={creatingUser}
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
                label='Емайл'
                htmlFor="email"
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
                name= "Зарегистрироваться"
                />
    </Form>
    </>
    console.log(authStatus)

    return (
   
            <>
       {checkToken()}
       {authStatus === 'double' ||authStatus === 'done' ? 
       <Form classNameWrapper='wrapper'
            classNameForm="wrapper_form">
                <Notification Notification={`${auth}`}/>
                <div className='wrapperFlex'>
                    <Button
                    click={backPage}
                    className="glow-on-hover"
                    name= "Вернутся назад"
                    />
                    <Link className='link' to={'/'}>
                    <Button
                    click={clearState}
                    className="glow-on-hover"
                    name= "На главную"
                    />
                    </Link>
                </div>
           


        </Form> : content}
            </>           
        
    )
}
export default Auth;