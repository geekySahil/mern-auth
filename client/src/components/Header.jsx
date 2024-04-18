import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Header() {
  const [signIn , setSignIn] = useState(false)
  const currentUser = useSelector(state => state.user.currentUser)
  console.log(currentUser)
  return (
   <nav className='flex justify-between bg-slate-300 p-2'>
        <h3 className='font-bold'>Auth App</h3>
        <ul className='flex space-x-4'>
            <li><Link to = "/">Home</Link></li>
            <li><Link to = "/about">About</Link></li>
            {currentUser ?  <li><Link to = "/profile"><img className = "h-7 w-7 self-center cursor-pointer rounded-full object-cover " src={currentUser.data.profile} alt="Profile" /></Link></li> :  <li><Link to={'/signin'}>sign in</Link></li> }
           
           

        </ul>
   </nav>
  )
}

export default Header
