import {useForm} from 'react-hook-form'
import {useEffect, useState} from 'react'
import AxiosRequest from '../components/AxiosRequest'

const Profile = () => {

    const {register, handleSubmit} = useForm()
    const [user, setUser] = useState('')
    const onSubmit = () => {
        console.log('Личный кабинет')
    }

    useEffect(() => {
        AxiosRequest.get('accounts/profile/', {
            withCredentials: true
        })
        .then(res => setUser(res.data))
        .catch(() => setUser(null))
    })

    return(
        <>
        <form >
            <input 
            type="text" {...register('username')}
            value={user.username}            
            
            />
            <input type="email" {...register('email')}/>
            <input type="password" {...register('password')}/>

        </form>
        </>
    )
}

export default Profile