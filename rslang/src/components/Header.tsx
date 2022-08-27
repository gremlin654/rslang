import React from 'react'
import { Link } from 'react-router-dom'
<<<<<<< HEAD
import '../style/header.scss'
=======
import { useAppSelector } from '../hooks/redux';
import '../style/Header.scss'
import { Avatar } from '@mui/material';
>>>>>>> develop

export default function Header() {
  const user = useAppSelector((state ) => state.userSlice);
  return (
    <header>
      <div className='wrapper'>
        <div className='header__container'>
          <div className='header__logo'>
            <h1>RS Lang</h1>
          </div>
          <nav className='header_nav'>
            <ul className='header-nav_list'>
              <li>
                <Link to='/'>Главная</Link>
              </li>
              <li>
<<<<<<< HEAD
                <Link to='/book'>Учебник</Link>
=======
                <Link to='/handbook'>Учебник</Link>
>>>>>>> develop
              </li>
              <li>
                <Link to='/games'>Мини-игры</Link>
              </li>
              <li>
                <Link to='/statistics'>Статитика</Link>
              </li>
              <li>
                <Link to='/profile'>Настройки</Link>
              </li>
              <li>
                <Link to='/about'>О команде</Link>
              </li>
            </ul>
          </nav>
          <div className='header__btn'>
              {user.userId !== '' ? <Link to='/profile' className='profile__icon'><Avatar src={user.avatarURL} sx={{width: 50, height: 50}} color='primary' /></Link> :<button className='btn'><Link to='/signin'><p>Войти</p></Link></button>}
          </div>
        </div>
      </div>
    </header>
  )
}
