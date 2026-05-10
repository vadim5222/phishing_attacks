import { useForm } from "react-hook-form"
import AxiosRequest from "../AxiosRequest"
import { useNavigate } from "react-router-dom"

const LoginForm = () => {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const onLogin = async (data) => {
        try {
            const response = await AxiosRequest.post('accounts/login/', {
                username: data.username,
                password: data.password
            }, {
                withCredentials: true
            })
            navigate('/')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <form onSubmit={handleSubmit(onLogin)}>
            <input type="text" {...register('username')} />
            <input type="text" {...register('password')} />
            <button type="submit">Войти</button>
        </form>
    )
}
export default LoginForm