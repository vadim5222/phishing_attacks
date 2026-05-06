import { useForm } from "react-hook-form"
import AxiosRequest from "../AxiosRequest"

const LoginForm = () => {

    const {register, handleSubmit} = useForm()
    const onLogin = (data) => {
        AxiosRequest.post('accounts/login/', {
            username: data.username,
            password: data.password
        })
    }


    return(
        <form onSubmit={handleSubmit(onLogin)}>
            <input type="text" {...register('username')}/>
            <input type="text" {...register('password')}/>
            <button type="submit">Войти</button>
        </form>
    )
}
export default LoginForm