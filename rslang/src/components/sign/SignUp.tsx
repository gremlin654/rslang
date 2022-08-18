import { Link } from 'react-router-dom';

export function SignUp() {
    return(
        <div className="login">
            <div className="login__container">
                <div className="login__logo">
                    <h1>RS Lang</h1>
                </div>
                <div className="login-form">
                    <div className="name">
                        <p>Name</p>
                        <input type='text' />
                    </div>
                    <div className="email">
                        <p>Email</p>
                        <input type='text' />
                    </div>
                    <div className="password__form">
                        <p>Password</p>
                        <input type='password' />
                    </div>
                </div>
                <div className="login__btn">Register</div>
                <Link className='login__register' to='/signin'>Have account? Just click on me!</Link>
            </div>
        </div>
    )
}