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
  const [isloggedin,setIsloggedin] = React.useState<Boolean>(false)
  const [showpopup,setShowpopup] = React.useState<Boolean>(false)
  return (
    <nav>
         <Image src={logo} alt="Logo" />
        <Link href='/'>Home</Link>
        <Link href='/bmical'>BMI Calculator</Link>
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
          showpopup && <Authpopup /> //if showpopup is true ,then goto AuthPopup
        }
    </nav>
  )
}

export default Navbar