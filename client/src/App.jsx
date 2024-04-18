import { useState } from 'react'
import { BrowserRouter, Routes} from 'react-router-dom'
import { Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import About from './pages/About.jsx'
import { Provider } from 'react-redux'


function App() {
  const [count, setCount] = useState(0)

  return (
  
    
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path={'/signin'} element={<SignIn/>} />
        <Route path='/signup' element={<SignUp/>} />
      </Routes>
    


 
  )
}

export default App
