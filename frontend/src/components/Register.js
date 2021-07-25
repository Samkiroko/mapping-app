import { Room } from '@material-ui/icons'
import React from 'react'
import './register.css'

export default function Register() {
  return (
    <div className='registerContainer'>
      <div className='logo'>
        <Room />
        SamPin
      </div>
      <form>
        <input type='text' placeholder='username' />
        <input type='email' placeholder='email' />
        <input type='text' placeholder='register' />
        <button className='registerBtn'> Register </button>
        <span className='success'>Successful.You can login now!</span>
        <span className='failure'>Something went wrong!</span>
      </form>
    </div>
  )
}
