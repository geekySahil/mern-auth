import React from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase/firebase';
import { useDispatch } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../store/reducers/authSlice';

function Oauth() {

  const dispatch = useDispatch()
  const auth = getAuth(app);
  async function handleGoogleClick (){
    try {
      const provider = new GoogleAuthProvider()
  
      const result = await signInWithPopup(auth , provider)
      console.log(result)
      dispatch(signInStart())
      const response = await fetch("http://localhost:3000/api/auth/google", {
        method:"POST",
        credentials: 'include',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name : result.user.displayName,
          email : result.user.email,
          photo : result.user.photoURL
        })
      })

      const data = await response.json();

      console.log(data);

      dispatch(signInSuccess(data));
    } catch (error) {
      console.log("could not login with google" , error)
      dispatch(signInFailure(data.message))
    }
  }


  return  (
    <button type = 'button' onClick={handleGoogleClick} className='uppercase bg-red-800 mt-6 p-3 hover:opacity-95 disabled:opacity:85 rounded-lg'>continue with google</button>
    )
  }

  
export default Oauth

