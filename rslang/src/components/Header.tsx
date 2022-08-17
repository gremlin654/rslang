import React from 'react'
import { Link } from 'react-router-dom'
import '../style/header.scss'


export default function Header() {
  return (
    <header>
        <div className='wrapper'>
            <div className='header__container'>
                <div className='header__logo'>
                    <h1>RS Lang</h1>
                </div>
                <nav className='header_nav'>
                    <ul className='header-nav_list'>
                        <li><Link to='/'>Главная</Link></li>
                        <li><Link to='/handbook'>Учебник</Link></li>
                        <li><Link to='/games'>Мини-игры</Link></li>
                        <li><Link to='/statistics'>Статитика</Link></li>
                        <li><Link to='/settings'>Настройки</Link></li>
                        <li><Link to='/about'>О команде</Link></li>
                    </ul>
                </nav>
                <div className='header__btn'>
                    <button className='btn'><Link to='/login'>Войти</Link></button>
                </div>
            </div>
        </div>
    </header>
  )
}
