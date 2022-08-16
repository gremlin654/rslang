import React from 'react'
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
                        <li>Главная</li>
                        <li>Учебник</li>
                        <li>Мини-игры</li>
                        <li>Статитика</li>
                        <li>Настройкиы</li>
                        <li>О команде</li>
                    </ul>
                </nav>
                <div className='header__btn'>
                    <button className='btn'>Войти</button>
                </div>
            </div>
        </div>
    </header>
  )
}
