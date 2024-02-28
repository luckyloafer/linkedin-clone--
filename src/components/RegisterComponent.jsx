import React, { useState } from 'react'
import { RegisterAPI, GoogleSignInAPI } from '../api/AuthAPI'
import { postUserData } from '../api/FirestoreAPI'
import linkedinLogo from '../assets/linkedinLogo.png'
import GoogleButton from 'react-google-button'
// import {navigate} from '../helpers/useNavigate'
import { useNavigate } from 'react-router-dom'
import '../Sass/LoginComponent.scss'
import { toast } from 'react-toastify'
import { getUniqueID } from '../helpers/getUniqueId'

const RegisterComponent = () => {

  const navigate = useNavigate();

  const [credentails, setCredentials] = useState({});

  const register = async () => {

    try {
      let res = await RegisterAPI(credentails.email, credentails.password)
      toast.success('Account Created')
      postUserData({
        userID:getUniqueID(),
        name:credentails.name,
        email:credentails.email,
        imageLink:"https://imgs.search.brave.com/Nv-hYH2En8MlCDX7wxHccvAZMkbLyyr8EVRFfp7Xw9U/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9rcmlz/dGFsbGUuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIwLzA3/L2R1bW15LXByb2Zp/bGUtcGljLTEuanBn"
      })
      navigate('/home')
      localStorage.setItem('userEmail', res.user.email)
    } catch (error) {
      console.log(error)
      toast.error('Error')
    }

  }

  const googleSignIn = () => {
    let response = GoogleSignInAPI()
    console.log(response)
  }

  return (
    <div className='login-wrapper'>
      <img src={linkedinLogo} className='linkedinLogo' />
      <div className='login-wrapper-inner'>
        <h1 className='heading'>Make the most of your professional life</h1>

        <div className='auth-inputs'>
          <input
            onChange={(e) => setCredentials({ ...credentails, name: e.target.value })}
            className='common-input'
            placeholder='Your Name'
            type='text'
          />
          <input
            onChange={(e) => setCredentials({ ...credentails, email: e.target.value })}
            className='common-input'
            placeholder='Enter email'
            type='email'
          />
          <input
            onChange={(e) => setCredentials({ ...credentails, password: e.target.value })}
            className='common-input'
            placeholder='password (6 or more characters)'
            type='password'
          />
        </div>
        <button onClick={register} className='login-btn'>Agree & Join</button>

      </div>
      <hr className='hr-text' data-content="or"></hr>
      <div className='google-btn-container'>
        <GoogleButton
          onClick={googleSignIn}
          className='google-btn' />
        <p className='go-to-signup'>
          Already on Linkedin? <span onClick={() => navigate("/")} className='join-now '>Sign in</span>
        </p>
      </div>

    </div>
  )
}

export default RegisterComponent