import React, { useState } from 'react'
import { LoginAPI, GoogleSignInAPI} from '../api/AuthAPI'
import linkedinLogo from '../assets/linkedinLogo.png'
import GoogleButton from 'react-google-button'
// import {navigate} from '../helpers/useNavigate'
import { useNavigate } from 'react-router-dom'
import '../Sass/LoginComponent.scss'
import { toast } from 'react-toastify'

const LoginComponent = () => {

  const navigate = useNavigate();

  const [credentails, setCredentials] = useState({});

  const login = async () => {

    try {
      let res = await LoginAPI(credentails.email, credentails.password)
      toast.success('Signed In to Linkedin')
      localStorage.setItem('userEmail',res.user.email)
      navigate('/home')
    } catch (error) {
      console.log(error)
      toast.error('Error')
    }

  }

  const googleSignIn = async()=>{
   let response =  await GoogleSignInAPI()
   console.log(response)
   navigate('/home')
  }

  return (
    <div className='login-wrapper'>
      <img src={linkedinLogo} className='linkedinLogo' />
      <div className='login-wrapper-inner'>
        <h1 className='heading'>Sign in</h1>
        <p className='sub-heading '>Stay updated in your professional world</p>
        <div className='auth-inputs'>
          <input
            onChange={(e) => setCredentials({ ...credentails, email: e.target.value })}
            className='common-input'
            placeholder='Enter email'
            type='email'
          />
          <input
            onChange={(e) => setCredentials({ ...credentails, password: e.target.value })}
            className='common-input'
            placeholder='Enter password'
            type='password'
          />
        </div>
        <button onClick={login} className='login-btn'>Sign in</button>

      </div>
      <hr className='hr-text' data-content="or"></hr>
      <div className='google-btn-container'>
        <GoogleButton
          onClick={googleSignIn}
          className='google-btn' />
        <p className='go-to-signup'>
          New to Linkedin? <span onClick={()=>navigate("/register")} className='join-now '>Join now</span>
        </p>
      </div>

    </div>
  )
}

export default LoginComponent