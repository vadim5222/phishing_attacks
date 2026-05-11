import { useForm } from 'react-hook-form'
import AxiosRequest from '../AxiosRequest'
import { Link } from 'react-router-dom'


const RegisterForm = () => {

    const { register, handleSubmit } = useForm()

    const onRegister = (data) => {
        try {
            AxiosRequest.post('accounts/register/', {
                username: data.username,
                email: data.email,
                password: data.password
            })
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <>
            <div>
                <form className='p-4 md:p-6 lg:p-8 bg-cyan-900 w-full rounded-xl' onSubmit={handleSubmit(onRegister)}>
                    <div className='grid grid-cols-1 sm:grid-cols-1 gap-4 bg-cyan-900 '>
                        <label className='block text-sm font-medium text-blue-300-700 mb-1' htmlFor='username'>username</label>
                        <input className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500' type="text" {...register('username')} />

                        <label className='block text-sm font-medium text-blue-300-700 mb-1' htmlFor='email'>email</label>
                        <input className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500' type="text" type="email" {...register('email')} />

                        <label className='block text-sm font-medium text-blue-300-700 mb-1' htmlFor='password'>password</label>
                        <input className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500' type="text" type="password" {...register('password')} />
                        <div className='flex items-center gap-11'>
                            <button className='w-1/2 my-5 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500' type="text" type='submit'>Зарегистрироваться</button>
                            <p className='text-white'>Уже есть аккаунт? <Link className='text-cyan-300' to='/login'>Войти</Link></p>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default RegisterForm