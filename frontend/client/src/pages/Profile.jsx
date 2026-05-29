import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import AxiosRequest from '../components/AxiosRequest'
import Header from '../components/Header'
import UserProfileUpdateForm from '../components/UserProfilleUpdateForm/UserProfileUpdateForm'
import Footer from '../components/Footer'

const Profile = () => {

    const [user, setUser] = useState(null)
    const [reviews, setReviews] = useState([])
    const [results, setResults] = useState([])
    const [favorites, setFavorites] = useState([])
    const [edit, setEdit] = useState(false)
    const [viewReviews, setViewReviews] = useState(false)
    const [viewResults, setViewResults] = useState(false)
    const [viewFavorites, setViewFavorites] = useState(false)




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

    useEffect(() => {
        AxiosRequest.get('accounts/favorites/')
            .then(res => {
                setFavorites(res.data)
            })
            .catch(() => setFavorites([]))
    }, [])





    return (
        <>
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className='container mx-auto flex-1'>
                    <div className='flex gap-40 mb-8'>
                        {user?.image ? (
                            <img
                                src={user.image}
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
                            <button onClick={() => setViewFavorites(!viewFavorites)} className='bg-slate-800 px-8 py-3 rounded-sm'>Избранное</button>
                            <button onClick={() => setViewResults(!viewResults)} className='bg-slate-800 px-8 py-3 rounded-sm'>Моя история проверок</button>
                            <button onClick={() => setViewReviews(!viewReviews)} className='bg-slate-800 px-8 py-3 rounded-sm'>Мои отзывы</button>
                        </div>
                    </div>
                    <div className='mt-8 grid gap-6 justify-items-center'>
                        {viewReviews && reviews?.map((review) =>
                            <div
                                className='bg-slate-800/70 border w-1/2 border-slate-700 rounded-2xl p-6 shadow-lg '
                                key={review.id}
                            >
                                <div className='flex justify-between items-center mb-3'>
                                    <h3 className='text-xl font-semibold'>Отзыв</h3>
                                    <span className=' px-3 py-1 rounded-lg text-sm'>
                                        {review?.score}
                                    </span>
                                </div>

                                <p className='text-slate-200 leading-relaxed'>
                                    {review?.text}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className='mt-8 grid gap-6 justify-items-center'>
                        {viewResults && results?.map((result) =>
                            <div
                                className='bg-slate-800/70 border w-1/2 border-slate-700 rounded-2xl p-6 shadow-lg hover:scale-[1.01]'
                                key={result.id}
                            >
                                <div className='flex justify-between items-center mb-4'>
                                    <h3 className='text-xl font-semibold text-cyan-400'>
                                        Проверка #{result?.id}
                                    </h3>

                                    <span className='bg-slate-700 px-3 py-1 rounded-lg text-sm'>
                                        {result?.created_at}
                                    </span>
                                </div>

                                <div className='space-y-2'>
                                    <p>
                                        <span className='text-slate-400'>URL:</span>
                                        <span className='break-all text-white'>{result?.url}</span>
                                    </p>

                                    <p>
                                        <span className='text-slate-400'>Результат:</span>
                                        <span className='text-cyan-300'>{result?.label}</span>
                                    </p>

                                    <p>
                                        <span className='text-slate-400'>Вероятность:</span>
                                        <span className='font-semibold text-green-400'>
                                            {result?.probability}%
                                        </span>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <div className='mt-8 grid gap-6 justify-items-center'>
                        {viewFavorites && favorites?.map((favorite) =>
                            <div
                                className='bg-slate-800/70 border border-slate-700 w-1/2 rounded-2xl p-6 shadow-lg '
                                key={favorite.id}
                            >
                                <div className='flex justify-between items-center mb-4'>
                                    <h3 className='text-xl font-semibold '>
                                        Избранное
                                    </h3>

                                    <span className='bg-slate-700 px-3 py-1 rounded-lg text-sm'>
                                        {favorite?.created_at}
                                    </span>
                                </div>

                                <div className='space-y-2'>
                                    <p>
                                        <span className='text-slate-400'>URL:</span>
                                        <span className='break-all text-white'>{favorite?.url}</span>
                                    </p>

                                    <p>
                                        <span className='text-slate-400'>Тип:</span>
                                        <span >{favorite?.label}</span>
                                    </p>

                                    <p>
                                        <span className='text-slate-400'>Вероятность:</span>
                                        <span className='font-semibold text-green-400'>
                                            {favorite?.probability}%
                                        </span>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <Footer/>
            </div>

        </>
    )
}

export default Profile