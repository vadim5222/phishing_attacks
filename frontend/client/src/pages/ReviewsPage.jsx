import Header from "../components/Header"
import ReviewForm from "../components/ReviewForm"
import Footer from '../components/Footer'

const ReviewsPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1">
                <ReviewForm />
            </div>
            <Footer />
        </div>
    )
}

export default ReviewsPage