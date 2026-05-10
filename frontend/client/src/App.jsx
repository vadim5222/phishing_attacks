import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Profile from './pages/Profile'
import URLPage from './pages/URLPage'

function App() {


  return (
    <div className='text-cyan-600'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/urlpage' element={<URLPage/>}/>
        </Routes>
    </div>
  )
}

export default App
