import Header from "../components/Header"
import ReviewForm from "../components/ReviewForm"
import Footer from '../components/Footer'
import { useState, useEffect } from "react"
import AxiosRequest from "../components/AxiosRequest"

const ReviewsPage = () => {

    const [review, setReview] = useState([])

    useEffect(() => {
        AxiosRequest.get('accounts/review/', {
            withCredentials: true
        })
        .then(res => setReview(res.data))
        .catch(() => setReview([]))
    }, [])

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
                <div className="container mx-auto flex-1 ">
                    <ReviewForm />
                <div className="flex flex-col  items-center">
                    {review.map((review) => 
                    <div key={review.id} className="bg-slate-600 mb-5 w-1/3 p-3 rounded-lg">
                        <p>{review.user}</p>
                        <p>{review.text}</p>
                        <p>{review.score}</p>
                    </div>
                    )}
                </div>
                </div>
            <Footer />
        </div>
    )
}

export default ReviewsPage