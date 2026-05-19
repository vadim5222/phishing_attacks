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
        AxiosRequest.get('accounts/users-admin')
            .then(res => setUsers(res.data))
            .catch(() => setUsers([]))
    }, [])

    useEffect(() => {
        AxiosRequest.get('accounts/reviews-admin')
            .then(res => setReviews(res.data))
            .catch(() => setReviews([]))
    }, [])

    useEffect(() => {
        AxiosRequest.get('accounts/results-admin')
            .then(res => setResults(res.data))
            .catch(() => setResults([]))
    }, [])


    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="container mx-auto flex-1">
                <button onClick={() => setViewUsers(!viewUsers)}>Показать пользователей</button>
                <button onClick={() => setViewReviews(!viewReviews)} >Показать отзывы</button>
                <button onClick={() => setViewResults(!viewResults)} >Показать отзывы</button>

            </div>
            <div>
                {viewUsers && <div>
                    {users.map((users) =>
                        <div key={users.id}>
                            <p>{users.username}</p>
                            <p>{users.email}</p>
                        </div>
                    )}
                </div>}
            </div>
            <div>
                {viewReviews && <div>
                    {reviews.map((reviews) =>
                        <div key={reviews.id}>
                            <p>{reviews.text}</p>
                            <p>{reviews.score}</p>
                        </div>
                    )}
                </div>}
            </div>
            <div>
                {viewResults && <div>
                    {results.map((results) =>
                        <div key={results.id}>
                            <p>{results.url}</p>
                            <p>{results.label}</p>
                            <p>{results.probability}</p>
                        </div>
                    )}
                </div>}
            </div>
            <Footer />
        </div>
    )
}

export default Admin