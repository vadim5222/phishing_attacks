import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import AxiosRequest from '../components/AxiosRequest'
import { useNavigate } from "react-router-dom"

const Home = () => {

    const username = localStorage.getItem('username')
    const navigate = useNavigate()

    const Logout = async () => {
        try{
            const response = await AxiosRequest.post('accounts/logout/')
            localStorage.removeItem('username')
            navigate('/login')
        } catch(e){
            console.log(e)
        }
    }

    return (
        <>
        <p>Добро пожаловать {username}</p>
            <Link to='/'>Главная</Link>
            <Link to='/login'>Войти</Link>
            <Link to='/register'>Зарегистрироваться</Link>
            <button onClick={Logout}>Выйти</button>
        </>

    )
}

export default Home