import { Link } from 'react-router-dom';
import '../../style/sign/SignIn.scss';

export function SignIn() {
    return(
        <div className="login">
            <div className="login__container">
                <div className="login__logo">
                    <h1>RS Lang</h1>
                </div>
                <div className="login-form">
                    <div className="email">
                        <p>Email</p>
                        <input type='text' />
                    </div>
                    <div className="password__form">
                        <p>Password</p>
                        <input type='password' />
                    </div>
                </div>
                <div className="login__btn">Login</div>
                <Link className='login__register' to='/signup'>Do not have an account? Just click on me!</Link>
            </div>
        </div>
    )
}