import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import AxiosRequest from '../components/AxiosRequest'
import Header from '../components/Header'
import UserProfileUpdateForm from '../components/UserProfilleUpdateForm/UserProfileUpdateForm'

const Profile = () => {

    const [user, setUser] = useState(null)
    const [reviews, setReviews] = useState([])
    const [results, setResults] = useState([])
    const [edit, setEdit] = useState(false)
    const [viewReviews, setViewReviews] = useState(false)
    const [viewResults, setViewResults] = useState(false)



    useEffect(() => {
        AxiosRequest.get('accounts/profile/', {
            withCredentials: true
        })
            .then(res => {
                setUser(res.data.user)
                setReviews(res.data.reviews)
                setResults(res.data.results)
            })
            .catch(() => setUser(null))
    }, [])




    return (
        <>
            <Header />

            <div className='container mx-auto'>
                <div className='flex gap-40 mb-8'>
                    {user?.image ? (
                        <img
                            src={`http://localhost:8000/${user.image}`}
                            alt="avatar"
                            className='rounded-xl w-96 h-96'
                        />
                    ) : <img className='rounded-xl' src='/профиль.webp' />}
                    <div>
                        <p className='text-3xl'>{user?.username}</p>
                        <p className='text-3xl'>{user?.email}</p>
                        <button
                            type='submit'
                            onClick={() => {
                                setEdit(!edit)
                            }}
                            className='border border-cyan-700 p-3 w-80 hover:bg-cyan-900 rounded-xl mt-8 mb-8'>
                            {edit ? 'Отменить редактирование' : 'Редактировать'}
                        </button>
                        {edit && <UserProfileUpdateForm userId={user.id} />}
                    </div>
                </div>


                <div className='flex items-center justify-center'>
                    <div className='flex gap-10'>
                        <button className='bg-slate-800 px-8 py-3 rounded-sm'>Избранное</button>
                        <button onClick={() => setViewResults(!viewResults)} className='bg-slate-800 px-8 py-3 rounded-sm'>Моя история проверок</button>
                        <button onClick={() => setViewReviews(!viewReviews)} className='bg-slate-800 px-8 py-3 rounded-sm'>Мои отзывы</button>
                    </div>
                </div>
                <div>
                    {viewReviews && reviews?.map((reviews) =>
                        <div key={reviews.id}>
                            <p>{reviews?.text}</p>
                            <p>{reviews?.score}</p>
                        </div>
                    )}
                </div>
                <div>
                    {viewResults && results?.map((results) =>
                        <div key={results.id}>
                            <p>{results?.id}</p>
                            <p>{results?.url}</p>
                            <p>{results?.label}</p>
                            <p>{results?.probability}</p>
                            <p>{results?.created_at}</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Profile