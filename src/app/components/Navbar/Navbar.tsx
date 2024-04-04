"use client"
import React from 'react'
import logo from './logo.png'
import { IoIosBody } from 'react-icons/io'
import './Navbar.css'
import Image from 'next/image'
import Link from 'next/link'
import {Button} from '@mui/material'
import Authpopup from '../AuthPopup/AuthPopup'

const Navbar = () => {
  const [isloggedin,setIsloggedin] = React.useState<boolean>(false)
  const [showpopup,setShowpopup] = React.useState<boolean>(false)
  const checklogin = async () => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/auth/checklogin', {
        method: 'POST',
        credentials: 'include',
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.ok) {
                setIsloggedin(true)
            }
            else{
                setIsloggedin(false)
            }
        })
        .catch(err => {
            console.log(err)
        })
}


React.useEffect(() => {    // if logged the button should display to log out 
    checklogin()
}, [showpopup])

  return (
    
    <nav>
         <Image src={logo} alt="Logo" />
        <Link href='/'>Home</Link>
        <Link href='/about'>About</Link>
        <Link href='/profile'><IoIosBody /></Link>
        {
          isloggedin?
          <button>LogOut</button>
          :
          <button
          onClick={
            ()=>{
              setShowpopup(true);
            }
          }>LogIn</button>
        }
        {
          showpopup && <Authpopup setShowpopup={setShowpopup}/> //if showpopup is true ,then goto AuthPopup,setShowpop as a propery for Authpopup
        }
       
    </nav>
   
  )
}

export default Navbar