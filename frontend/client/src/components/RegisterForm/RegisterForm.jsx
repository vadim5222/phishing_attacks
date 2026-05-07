import {useForm} from 'react-hook-form'
import AxiosRequest from '../AxiosRequest'


const RegisterForm = () => {

    const {register, handleSubmit} = useForm()

    const onRegister = (data) => {
        AxiosRequest.post('accounts/register/', {
            username: data.username,
            email: data.email,
            password: data.password
        })
        .then(data => data.json())
        .catch(error => console.log(error))
    }

    return(
        <>
        <form onSubmit={handleSubmit(onRegister)}>
            <input type="text" {...register('username')}/>
            <input type="email" {...register('email')}/>
            <input type="password" {...register('password')}/>
            <button type='submit'>Зарегистрироваться</button>
        </form>
        </>
    )
}

export default RegisterForm