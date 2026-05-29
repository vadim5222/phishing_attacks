import Footer from "../components/Footer"
import Header from "../components/Header"
import { useState, useEffect } from "react"
import AxiosRequest from "../components/AxiosRequest"

const Admin = () => {

    const [users, setUsers] = useState([])
    const [reviews, setReviews] = useState([])
    const [results, setResults] = useState([])
    const [viewUsers, setViewUsers] = useState(false)
    const [viewReviews, setViewReviews] = useState(false)
    const [viewResults, setViewResults] = useState(false)



    useEffect(() => {
        AxiosRequest.get('accounts/users-admin/')
            .then(res => {
                setUsers(res.data)
            })
            .catch(() => setUsers([]))
    }, [])

    useEffect(() => {
        AxiosRequest.get('accounts/reviews-admin/')
            .then(res => setReviews(res.data))
            .catch(() => setReviews([]))
    }, [])

    useEffect(() => {
        AxiosRequest.get('accounts/results-admin/')
            .then(res => setResults(res.data))
            .catch(() => setResults([]))
    }, [])

    const deleteUser = async (userId) => {
        try {
            const response = await AxiosRequest.delete(`accounts/user-delete/${userId}/`)
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }

    const deleteReview = async (reviewId) => {
        try {
            const response = await AxiosRequest.delete(`accounts/review-delete/${reviewId}/`)
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }

    const deleteResult = async (resultId) => {
        try {
            const response = await AxiosRequest.delete(`accounts/result-delete/${resultId}/`)
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="container mx-auto flex-1">
                <h1 className="text-3xl mb-8">Админ панель</h1>
                <div className="mb-10 flex items-start justify-start gap-10">
                    <button className="bg-slate-800/45 px-8 py-3 rounded-sm" onClick={() => setViewUsers(!viewUsers)}>Показать пользователей</button>
                    <button className="bg-slate-800/45 px-8 py-3 rounded-sm" onClick={() => setViewReviews(!viewReviews)} >Показать отзывы</button>
                    <button className="bg-slate-800/45 px-8 py-3 rounded-sm" onClick={() => setViewResults(!viewResults)} >Показать историю проверок </button>
                </div>

                <div className="mt-8 overflow-x-auto border border-slate-700">
                    {viewUsers && (
                        <table className="w-full text-base bg-slate-900 border-collapse">
                            <thead className="bg-slate-800 text-white">
                                <tr>
                                    <th className="border border-slate-700 px-6 py-4 text-left">ID</th>
                                    <th className="border border-slate-700 px-6 py-4 text-left">Username</th>
                                    <th className="border border-slate-700 px-6 py-4 text-left">Email</th>
                                    <th className="border border-slate-700 px-6 py-4 text-left">Admin</th>
                                    <th className="border border-slate-700 px-6 py-4 text-left">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map(user =>
                                    <tr
                                        key={user.id}
                                        className="hover:bg-slate-800"
                                    >
                                        <td className="border border-slate-700 px-6 py-4">
                                            {user.id}
                                        </td>

                                        <td className="border border-slate-700 px-6 py-4">
                                            {user.username}
                                        </td>

                                        <td className="border border-slate-700 px-6 py-4">
                                            {user.email}
                                        </td>

                                        <td className="border border-slate-700 px-6 py-4">
                                            {user.is_staff ? 'Да' : 'Нет'}
                                        </td>

                                        <td className="border border-slate-700 px-6 py-4">
                                            <button
                                                onClick={() => deleteUser(user.id)}
                                                className="bg-slate-900/50 hover:bg-slate-600/45"
                                            >
                                                Удалить
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
                <div className="mt-8 overflow-x-auto border border-slate-700">
                    {viewReviews && (
                        <table className="w-full text-base bg-slate-900 border-collapse">
                            <thead className="bg-slate-800 text-white">
                                <tr>
                                    <th className="border border-slate-700 px-6 py-4 text-left">
                                        ID
                                    </th>

                                    <th className="border border-slate-700 px-6 py-4 text-left">
                                        Отзыв
                                    </th>

                                    <th className="border border-slate-700 px-6 py-4 text-left">
                                        Оценка
                                    </th>

                                    <th className="border border-slate-700 px-6 py-4 text-left">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {reviews.map(review =>
                                    <tr
                                        key={review.id}
                                        className="hover:bg-slate-800"
                                    >
                                        <td className="border border-slate-700 px-6 py-4">
                                            {review.id}
                                        </td>

                                        <td className="border border-slate-700 px-6 py-4">
                                            {review.text}
                                        </td>

                                        <td className="px-6 py-4">
                                            {review.score}
                                        </td>

                                        <td className="border border-slate-700 px-6 py-4">
                                            <button
                                                onClick={() => deleteReview(review.id)}
                                            
                                            >
                                                Удалить
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
                <div className="mt-8 overflow-x-auto border border-slate-700">
                    {viewResults && (
                        <table className="w-full text-base bg-slate-900 border-collapse">
                            <thead className="bg-slate-800 text-white">
                                <tr>
                                    <th className="border border-slate-700 px-6 py-4 text-left">
                                        ID
                                    </th>

                                    <th className="border border-slate-700 px-6 py-4 text-left">
                                        URL
                                    </th>

                                    <th className="border border-slate-700 px-6 py-4 text-left">
                                        Label
                                    </th>

                                    <th className="border border-slate-700 px-6 py-4 text-left">
                                        Probability
                                    </th>

                                    <th className="border border-slate-700 px-6 py-4 text-left">
                                        Created
                                    </th>


                                    <th className="border border-slate-700 px-6 py-4 text-left">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {results.map(result =>
                                    <tr
                                        key={result.id}
                                        className="hover:bg-slate-800"
                                    >
                                        <td className="border border-slate-700 px-6 py-4">
                                            {result.id}
                                        </td>

                                        <td className="border border-slate-700 px-6 py-4 break-all">
                                            {result.url}
                                        </td>

                                        <td className="border border-slate-700 px-6 py-4">
                                            {result.label}
                                        </td>

                                        <td className="border border-slate-700 px-6 py-4">
                                            {result.probability}
                                        </td>

                                        <td className="border border-slate-700 px-6 py-4">
                                            {result.created_at}
                                        </td>


                                        <td className="border border-slate-700 px-6 py-4">
                                            <button
                                                onClick={() => deleteResult(result.id)}
                                               
                                            >
                                                Удалить
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Admin