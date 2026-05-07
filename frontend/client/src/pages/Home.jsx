import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import AxiosRequest from '../components/AxiosRequest'

const Home = () => {

    const username = localStorage.getItem('username')

    return (
        <>
        <p>Добро пожаловать {username}</p>
            <Link to='/'>Главная</Link>
            <Link to='/login'>Войти</Link>
            <Link to='/register'>Зарегистрироваться</Link>

        </>

    )
}

export default Home