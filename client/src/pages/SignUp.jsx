import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInFailure, signInStart, signInSuccess } from '../store/reducers/authSlice';
import Oauth from '../components/Oauth';


function SignUp() {

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  // const [loading, setLoading] = useState(false);
  const {loading, error, currentUser} = useSelector(state=> state.user)
  const navigate = useNavigate();


  function handleChange (e) {
    setFormData({...formData, [e.target.id] : e.target.value})
  }

  // console.log(formData)

  async function handleClick (e) {
    e.preventDefault()
      
    try {
      dispatch( signInStart())
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
      const data = await response.json()
      console.log(data)

      if(data.statusCode === 200){
        dispatch(signInSuccess(data))
      }

      dispatch(signInFailure(data))
    } catch (error) {
      dispatch(signInFailure(data.message));

    }

  }

  function handleGoogleClick (e) {
    e.preventDefault()
  }

  // console.log(formData)
  return (
    <div className='max-w-lg mx-auto'>
      <form className='flex flex-col'>
        
           <h1 className='font-bold mt-7 mx-auto'>Sign Up</h1>

            <input onChange = {handleChange} id = 'username' type='text' placeholder='username' className='p-3 bg-slate-200 rounded-lg mt-5'/>
            <input onChange = {handleChange} id = 'email' type='email' placeholder='email' className='p-3 bg-slate-200 rounded-lg mt-5'/>
            <input onChange = {handleChange} id = 'password' type='password' placeholder='Password' className='p-3 bg-slate-200 rounded-lg mt-5'/>
            <button onClick = {handleClick} className='uppercase bg-slate-800 mt-6 p-3 hover:opacity-95 disabled:opacity:85 rounded-lg'>sign up</button>
            <  Oauth/>       

      </form>
      <div className='flex justify-between mt-1'>
        <p>Already have an account?</p>
        <p onClick={() => navigate('/signin')}>Sign in</p>
      </div>
      
    </div>
  )
}

export default SignUp
