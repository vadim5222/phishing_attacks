import { useForm } from "react-hook-form"
import AxiosRequest from "../AxiosRequest"
import { Link,useNavigate } from "react-router-dom"


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
        <div>
            <div>
                <form className=' p-4 md:p-6 lg:p-8 bg-cyan-950 w-full rounded-xl' onSubmit={handleSubmit(onLogin)}>
                    <label for='username'>username</label>
                    <input className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500' type="text" {...register('username')} />
                    <label for='password'>password</label>
                    <input className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500' type="password" {...register('password')} />
                    <div className="flex items-center gap-6">
                        <button className='w-1/2 my-5 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500' type="submit">Войти</button>
                        <p className="text-white">Нету аккаунта? <Link className="text-cyan-300" to='/register'>Зарегистрироваться</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default LoginForm