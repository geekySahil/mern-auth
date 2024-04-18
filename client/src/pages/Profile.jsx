import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { accountDeleteFaliure, accountDeleteStart, accountDeleteSuccess, signOutSuccess, updateAccountFaliure, updateAccountSuccess,updateAccountStart } from '../store/reducers/authSlice'
import authSlice from '../store/reducers/authSlice'
import { app } from '../firebase/firebase'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';


function Profile() {

  const dispatch = useDispatch()
  const { loading, error, currentUser } = useSelector(state => state.user)

  const [formData, setFormData] = useState({
    username: currentUser.data.username,
    email: currentUser.data.email,
    password: currentUser.data.password,
    profile: currentUser.data.profile
  });
  const fileRef = useRef(null);
  const [image, setImage] = useState(null)
  const [imagePercentage, setImagePercentage] = useState(0)
  const [imageError, setImageError] = useState(null)
  // console.log(loading, error, currentUser)

  const navigate = useNavigate()


  async function handleUpdate(e){
    e.preventDefault()
    try {
      dispatch(updateAccountStart())
      const res = await fetch(`http://localhost:3000/api/user/update/${currentUser.data._id}`, {
        method:'POST',
        credentials: 'include',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      console.log(data)
      if(data.statusCode === 200){
        dispatch(updateAccountSuccess(data));

      }
      dispatch(updateAccountFaliure(data.message))
    } catch (error) {
      dispatch(updateAccountFaliure(error))
    }
  }

  useEffect(() => {
    if(image){
      handleFileUpload(image)
    }
  }, [image])

  async function handleFileUpload (image){
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName)

    const uploadTask = uploadBytesResumable(storageRef, image)

    uploadTask.on('state_changed', (snapshot) => {
      const process = (snapshot.bytesTransferred/snapshot.totalBytes) * 100
      setImagePercentage(Math.floor(process));
    },
    (error)=> {
      setImageError(error);
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        console.log(url)
        setFormData({...formData, profile:url})
      })
    }
  
  )
  }

  
  function handleChange(e) {
    setFormData({...formData, [e.target.id] : e.target.value })


  }

  async function handleDelete(e) {
    e.preventDefault()
    try {
      dispatch(accountDeleteStart())
      const res = await fetch(`http://localhost:3000/api/user/delete/${currentUser.data._id}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      console.log(res)
      
      const data = await res.json();


      if(data.statusCode === 201){
        dispatch(accountDeleteSuccess(data));
        navigate('/signin')
      }

      dispatch(accountDeleteFaliure(data.message));

    } catch (error) {
      dispatch(accountDeleteFaliure(error));
      
    }
  }

  async function handleSignOut() {
    try {
      const response = await fetch("http://localhost:3000/api/auth/signout", {
        method: 'DELETE',
        credentials: 'include',
      })
      console.log(response)
      const data = response.json();
      console.log(data);
      dispatch(signOutSuccess())
      navigate('/signin')

    } catch (error) {
      console.log(error);
    }
  }
  // ref={fileRef}

  // console.log(formData, image)
  return (
    <div className='max-w-lg mx-auto'>
      <form className='flex flex-col'>
        <input ref={fileRef} type='file' className='hidden' accept='image/*' onChange={(e) => setImage(e.target.files[0])}/>
        <div className='mx-auto my-4'>
          <img src={formData.profile || currentUser.data.profile } onClick={() => fileRef.current.click()} alt="profile image" className='h-24 w-24 self-center cursor-pointer rounded-full object-cover ' />
        </div>
        <p className='text-sm self-center'>
          {
            imageError? <span className='text-slate-700'>error uploading image</span>: 
            imagePercentage>0 && imagePercentage<100 ?<span className='text-slate-700'>{`Uploading: ${imagePercentage} %`}</span>: 
            imagePercentage === 100 ? <span className='text-green-700'>uploaded successfully</span> : ''
          }
        </p>
        <input defaultValue={currentUser.data.username } onChange={handleChange} id='username' type='username' placeholder='username' className='p-3 bg-slate-200 rounded-lg mt-5' />
        <input defaultValue={currentUser.data.email} onChange={handleChange} id='email' type='email' placeholder='email' className='p-3 bg-slate-200 rounded-lg mt-5' />
        <input onChange={handleChange} id='password' type='password' placeholder='Password' className='p-3 bg-slate-200 rounded-lg mt-5' />
        <button  onClick={handleUpdate} className='uppercase bg-slate-800 mt-6 p-3 hover:opacity-95 disabled:opacity:85 rounded-lg'>{loading? 'loading...' : 'update'}</button>



      </form>
      <div className='text-red-700 flex justify-between hover:cursor-pointer'>
        <p onClick={handleDelete}>delete account</p>
        <p onClick={handleSignOut}>Sign Out</p>
      </div>
  
    </div>
  )
}

export default Profile
