import { Link } from "react-router-dom"

const Home = () => {
    return (
        <>
            <Link to='/'>Главная</Link>
            <Link to='/login'>Войти</Link>
            <Link to='/register'>Зарегистрироваться</Link>
        </>

    )
}

export default Home