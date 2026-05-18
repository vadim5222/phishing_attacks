import { useForm } from 'react-hook-form'
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
        <>
            <form onSubmit={handleSubmit(createReview)}>
                <input type="text" {...register('text')} />
                <input type="number" {...register('score')} />
                <button type='submit'>Отправить</button>
            </form>
        </>
    )
}

export default ReviewForm