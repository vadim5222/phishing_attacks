import { useForm } from 'react-hook-form'
import AxiosRequest from '../components/AxiosRequest'
import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'



const UrlPage = () => {

    const { register, handleSubmit } = useForm()
    const [result, setResult] = useState(null)

    const CheckUrl = async (data) => {
        try {

            const formData = new FormData()
            formData.append('url', data.url)
            const response = await AxiosRequest.post('accounts/check-url/',
                formData
            )
            console.log(response)
            setResult(response.data)
        } catch (e) {
            console.log(e)
        }
    }


    const addFavorite = async (resultId) => {
        try {
            const response = await AxiosRequest.get(`app/urls/${resultId}/favorite/`)
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className='min-h-screen flex flex-col'>
            <Header />
            <div className='container mx-auto flex-1'>
                <form className="p-4 md:p-6 lg:p-8  w-full rounded-xl mb-10" onSubmit={handleSubmit(CheckUrl)}>
                    <input className='w-1/2 mx-auto flex rounded-sm outline-none p-3 bg-slate-800 text-slate-700 mb-4' type="url" placeholder='Введите url для проверки' {...register('url')} />
                    <button className='bg-slate-800 w-1/6 p-2 rounded-sm flex mx-auto justify-center' type='submit'>Проверить</button>
                </form>
                <div className='flex justify-center items-center'>
                    {result &&
                        <div className='bg-slate-800/45 p-8 rounded-md flex items-center gap-10'>
                            <div>
                                <p>URL адрес - {result?.url}</p>
                                <p>Результат - {result?.label}</p>
                                <p>Вероятность фишинговой атаки - {result?.probability}</p>
                                <p>Время проверки - {result?.created_at}</p>
                            </div>
                            <div>
                                <button onClick={() => addFavorite(result?.id)}>
                                    <img className='w-10' src="/favorite.png" alt="favorite" />
                                </button>
                            </div>

                        </div>}
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default UrlPage