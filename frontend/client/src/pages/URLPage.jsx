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
        } catch(e){
            console.log(e)
        }
    }

    return (
        <>
        <Header/>
        <div className='container mx-auto'>
            <form className="p-4 md:p-6 lg:p-8  w-full rounded-xl" onSubmit={handleSubmit(CheckUrl)}>
                <input className='w-1/2 mx-auto flex rounded-lg outline-none p-3 bg-slate-800 text-slate-700 mb-10' type="url" {...register('url')} />
                <button className='bg-slate-800 w-1/6 p-2 rounded-lg flex mx-auto justify-center' type='submit'>Проверить</button>
            </form>
            <div>
                <p>URL адрес - {result?.url}</p>
                <p>Результат - {result?.label}</p>
                <p>Вероятность фишинговой атаки - {result?.probability}</p>
            </div>
        </div>
        <Footer/>
        </>
        
    )
}

export default UrlPage