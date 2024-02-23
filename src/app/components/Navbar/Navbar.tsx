import React from 'react'
import logo from './logo.png'
import { IoIosBody } from 'react-icons/io'
import './Navbar.css'
import Image from 'next/image'
import Link from 'next/link'
import {Button} from '@mui/material'
const Navbar = () => {
  return (
    <nav>
         <Image src={logo} alt="Logo" />
        <Link href='/'>Home</Link>
        <Link href='/bmical'>BMI Calculator</Link>
        <Link href='/about'>About</Link>
        <Link href='/profile'><IoIosBody /></Link>
        <button>SignOut</button>
    </nav>
  )
}

export default Navbar