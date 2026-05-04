import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
    return(
        <Container>
            <h1>Главная страница</h1>
            <Link to='/login'>Войти</Link>
            <Link to='/signup'>Зарегитрироваться</Link>
            <Link to='/'>На главную</Link>
        </Container>
    )
}

export default Home