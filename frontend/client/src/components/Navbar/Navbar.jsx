import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import AxiosRequest from '../AxiosRequest'
import { useNavigate } from "react-router-dom"

const Header = () => {
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
            .then(res =>setUser(null))
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
            <Link to='/reviews'>Отзывы</Link>
            {user?.user.is_staff && <Link to='/admin-panel'>Админ панель</Link>}
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
            <header className="bg-cyan-950/45 rounded-b-sm mb-8">
                <div className="container mx-auto p-8">
                    <div>
                        {user ?
                            <div className="text-xl flex gap-7 ">
                                {appRouter}
                            </div>
                            :
                            <div className="text-xl flex gap-7 ">
                                {authRouter}
                            </div>
                        }
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header