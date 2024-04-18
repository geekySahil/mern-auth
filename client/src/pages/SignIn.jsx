import React from 'react'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import { signInStart, signInFailure, signInSuccess } from '../store/reducers/authSlice';
import Oauth from '../components/Oauth';


function SignIn() {

  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);
  // const [errorMsg, setErrorMsg] = useState("");

  const {loading, error} = useSelector((state) => state.user);
  const [formData, setFormData] = useState({})

  const dispatch = useDispatch();

  function handleChange (e){
    setFormData({...formData, [e.target.id] : e.target.value})
  }

  async function handleClick  (e){
    e.preventDefault()
    dispatch(signInStart())
    try {
      const response = await fetch("http://localhost:3000/api/auth/signin", {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(formData)
      })
      const data = await response.json();
      console.log(data);
      if(data.statusCode === 200){
        dispatch(signInSuccess(data))
      }
      dispatch(signInFailure(data.message))
    } catch (error) {
      // setErrorMsg(error.message)
      // console.log(error);
      dispatch(signInFailure(error.message));
    }
  }


  return (
    <div className='max-w-lg mx-auto'>
    <form className='flex flex-col'>
      
         <h1 className='font-bold mt-7 mx-auto'>Sign In</h1>

          <input onChange={handleChange} id = 'email' type='email' placeholder='email' className='p-3 bg-slate-200 rounded-lg mt-5'/>
          <input onChange={handleChange} id = 'password' type='password' placeholder='Password' className='p-3 bg-slate-200 rounded-lg mt-5'/>
          <button onClick = {handleClick} className='uppercase bg-slate-800 mt-6 p-3 hover:opacity-95 disabled:opacity:85 rounded-lg'>sign in</button>
          <Oauth/>       


      

    </form>
    <div className='flex gap-3'>
      <p>Dont have an account?</p>
      <p className='text-blue-600' onClick={() => navigate('/signup')}>Sign Up</p>
    </div>
   
  </div>
  )
}

export default SignIn
