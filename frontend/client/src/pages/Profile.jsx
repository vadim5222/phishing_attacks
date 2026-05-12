import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import AxiosRequest from '../components/AxiosRequest'
import Navbar from '../components/Navbar/Navbar'
import RegisterForm from '../components/RegisterForm/RegisterForm'

const Profile = () => {

    const { register, handleSubmit } = useForm()
    const [user, setUser] = useState(null)
    const [edit, setEdit] = useState(false)


    useEffect(() => {
        AxiosRequest.get('accounts/profile/', {
            withCredentials: true
        })
            .then(res => setUser(res.data))
            .catch(() => setUser(null))
    }, [])

    return (
        <>
            <Navbar />


            <div className='container mx-auto'>
                <div className='flex gap-40 mb-8'>
                    {user?.image ? (
                        <img
                            src={`http://localhost:8000/${user.image}`}
                            alt="avatar"
                            className='rounded-xl'
                        />
                    ) : <img src='/профиль.webp' />}
                    <div>
                        <p className='text-3xl'>{user?.username}</p>
                        <p className='text-3xl'>{user?.email}</p>
                        <button
                            type='submit'
                            onClick={() => {
                                setEdit(!edit)
                            }}
                            className='border border-cyan-700 p-3 w-80 hover:bg-cyan-900 rounded-xl mt-8'>
                            Редактировать
                        </button>
                    </div>
                </div>
                {edit && <RegisterForm />}


                <div className='flex items-center justify-center'>
                    <nav>
                        <ul className='flex gap-10'>
                            <a className='text-3xl' href="#">Иcтория проверок</a>
                            <a className='text-3xl' href="#">Избранное</a>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Profile