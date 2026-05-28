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

    const deleteUser = async (userId ) => {
        try {
            const response = await AxiosRequest.delete(`accounts/user-delete/${userId}/`)
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }

    const deleteReview = async (reviewId) => {
        try{
            const response = await AxiosRequest.delete(`accounts/review-delete/${reviewId}/`)
            console.log(response)
        }catch(e){
            console.log(e)
        }
    }

    const deleteResult = async(resultId) => {
        try{
            const response = await AxiosRequest.delete(`accounts/result-delete/${resultId}/`)
            console.log(response)
        }catch(e){
            console.log(e)
        }
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="container mx-auto flex-1">
                <div className="mb-10">
                    <button onClick={() => setViewUsers(!viewUsers)}>Показать пользователей</button>
                    <button onClick={() => setViewReviews(!viewReviews)} >Показать отзывы</button>
                    <button onClick={() => setViewResults(!viewResults)} >Показать историю проверок </button>
                </div>

                <div>
                    {viewUsers && <div className="flex flex-wrap gap-8">
                        {users?.map(user =>
                            <div className="bg-slate-800 px-9 py-2 rounded-sm" key={user.id}>
                                <div className="mb-2">
                                    <p>{user.username}</p>
                                    <p>{user.email}</p>
                                </div>
                                <button onClick={() => deleteUser(user.id)}  className="px-5 py-1 rounded-sm bg-slate-900">Удалить</button>
                            </div>
                        )}
                    </div>}
                </div>
                <div>
                    {viewReviews && <div className="flex flex-wrap gap-8">
                        {reviews?.map(review =>
                            <div className="bg-slate-800 px-9 py-2 rounded-sm" key={review.id}>
                                <div className="mb-2">
                                    <p>{review.username}</p>
                                    <p>{review.text}</p>
                                    <p>{review.score}</p>
                                </div>
                                <button onClick={() => deleteReview(review.id)} className="px-5 py-1 rounded-sm bg-slate-900">Удалить</button>
                            </div>
                        )}
                    </div>}
                </div>
                <div>
                    {viewResults && <div className="flex flex-wrap gap-8">
                        {results?.map(result =>
                            <div className="bg-slate-800 px-9 py-2 rounded-sm" key={result.id}>
                                <div className="mb-2">
                                    <p>{result.url}</p>
                                    <p>{result.label}</p>
                                    <p>{result.probability}</p>
                                </div>
                                <button onClick={() => deleteResult(result.id)} className="px-5 py-1 rounded-sm bg-slate-900">Удалить</button>
                            </div>
                        )}
                    </div>}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Admin