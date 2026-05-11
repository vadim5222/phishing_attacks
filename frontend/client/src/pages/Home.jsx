import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import AxiosRequest from '../components/AxiosRequest'
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"

const Home = () => {
    return (
        <div>
                <Navbar />
        </div>
    )
}

export default Home