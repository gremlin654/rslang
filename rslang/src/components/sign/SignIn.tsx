import { Alert } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IAuth, IFullUser, IResponse, IUser } from '../../models/IUser';
import { registrationAPI } from '../../services/PostService';
import { loginSlice } from '../../store/reducers/LoginSlice';
import { userSlice } from '../../store/reducers/UserSlice';
import '../../style/sign/SignIn.scss';

const MailEndsWith = ['@gmail.com', '@mail.ru', '@yandex.ru'];

export function SignIn() {
    const [authorization] = registrationAPI.useLoginMutation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const isAuth = useAppSelector((state ) => state.loginSlice);
    const user = useAppSelector((state ) => state.userSlice);
    // const changeLogin = loginSlice.actions.changeLogin;
    // const changeToken = loginSlice.actions.changeToken;
    // const changeAvatarUrl = loginSlice.actions.chageAvatarUrl;
    const setUser = userSlice.actions.setUser;
    const dispatch = useAppDispatch();

    const handleSubmit = useCallback(async() => {
        if(!email || !password){
            alert('Пароль или почта не могут быть пустыми');
            return;
        }
        const response = await authorization({ email, password }) as IResponse;
        if(!response.error) {
            dispatch(setUser(response.data));
            localStorage.setItem('user', JSON.stringify(response));
            alert(response.data.message);
        }else{
            alert(response.error.data.message);

        }
    },[email, password]);

    return(
        <div className="login">
            <div className="login__container">
                <div className="login__logo">
                    <h1>RS Lang</h1>
                </div>
                <div className="login-form">
                    <div className="email">
                        <p>Email</p>
                        <input type='text' value={email} onChange={(e) => {setEmail(e.target.value)}} />
                    </div>
                    <div className="password__form">
                        <p>Password</p>
                        <input type='password' value={password} onChange={(e) => {setPassword(e.target.value)}} />
                    </div>
                </div>
                <div className="login__btn" onClick={() => handleSubmit() } >Login</div> 
                <Link className='login__register' to='/signup'>Do not have an account? Just click on me!</Link>
            </div>
        </div>
    )
}
