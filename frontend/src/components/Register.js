import { Cancel, Room } from '@material-ui/icons'
import axios from 'axios'
import React, { useRef, useState } from 'react'
import './register.css'

export default function Register() {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [registering, setRegistering] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    try {
      await axios.post('/users/register', newUser)
      setError(false)
      setSuccess(true)
    } catch (err) {
      setError(true)
    }
  }

  return (
    <div className='registerContainer'>
      <div className='logo'>
        <Room />
        SamPin
      </div>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='username' ref={nameRef} />
        <input type='email' placeholder='email' ref={emailRef} />
        <input type='password' placeholder='password' ref={passwordRef} />
        <button className='registerBtn'> Register </button>
        {success && <span className='success'>Successful.You can login now!</span>}
        {error && <span className='failure'>Something went wrong!</span>}
      </form>
      <Cancel className='registerCancel' />
    </div>
  )
}
