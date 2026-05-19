import { useForm } from 'react-hook-form'
import { useState } from 'react'
import AxiosRequest from './AxiosRequest'

const ReviewForm = () => {

    const { register, handleSubmit } = useForm()

    const createReview = async (data) => {
        try {
            const formData = new FormData()
            formData.append('text', data.text)
            formData.append('score', data.score)

            const response = await AxiosRequest.post('accounts/review/',
                formData
            )
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }




    return (
        <div>
            <div className='flex justify-center'>
                <form className='p-4 md:p-6 lg:p-8 bg-cyan-950 w-3/6 rounded-xl mb-10' onSubmit={handleSubmit(createReview)}>
                    <label className='block mb-1' htmlFor="text">Отзыв</label>
                    <textarea
                        className='w-full h-52 p-4 border text-3xl border-gray-300 rounded-md focus:outline-none mb-3 focus:ring-blue-500 focus:border-blue-500' type="text"
                        placeholder='Введите ваш отзыв'
                        {...register('text')} />
                    <label className='block mb-1' htmlFor="score">Оценка</label>
                    <input
                        className='w-52 block px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                        type="number"
                        placeholder='Поставьте оценку'
                        {...register('score')} />
                    <button className='w-56 flex mx-auto justify-center my-5 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 hover:bg-slate-800' type='submit'>Отправить</button>
                </form>
            </div>
        </div>
    )
}

export default ReviewForm