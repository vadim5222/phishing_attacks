import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import AxiosRequest from '../../components/AxiosRequest'
import { useNavigate } from "react-router-dom"

const Navbar = () => {
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
            <header className="bg-cyan-950">
                <div className="p-8">
                    <div className="w-1/2 flex justify-center">
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

export default Navbar