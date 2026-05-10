import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import AxiosRequest from '../components/AxiosRequest'
import { useNavigate } from "react-router-dom"

const Home = () => {

    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        AxiosRequest.get('accounts/profile/', {
            withCredentials: true
        })
            .then(res => setUser(res.data))
            .catch(() => setUser(null));
    }, [])



    const Logout = async () => {
        try {
            const response = await AxiosRequest.post('accounts/logout/', {}, {
                withCredentials: true
            })
            setUser(null)
            navigate('/')
        } catch (e) {
            console.log(e)
        }
    }

    const appRouter = (
        <>
            <Link to='/'>Главная</Link>
            <Link to='/profile'>Личный кабинет</Link>
            <Link to='/urlpage'>Проверка url</Link>
            <button onClick={Logout}>Выйти</button>
        </>
    )

    const authRouter = (
        <>
            <Link to='/login'>Войти</Link>
            <Link to='/register'>Зарегистрироваться</Link>
        </>
    )


    return (
        <>
            <p>{user ? user.username : 'авторизуйтесь'}</p>
            {user ? appRouter : authRouter}
        </>

    )
}

export default Home