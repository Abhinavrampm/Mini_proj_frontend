"use client"
import React from 'react'
import logo from './logo.png'
import { IoIosBody } from 'react-icons/io'
import './Navbar.css'
import Image from 'next/image'
import Link from 'next/link'
import Authpopup from '../AuthPopup/AuthPopup'

const Navbar = () => {
  const [isloggedin,setIsloggedin] = React.useState<boolean>(false)
  const [showpopup,setShowpopup] = React.useState<boolean>(false)
  const [isAdmin,setIsAdmin] = React.useState<boolean>(false)
  

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

const checkAdminlogin = async () => {
  fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/admin/checklogin', {
      method: 'POST',
      credentials: 'include',
  })
      .then(res => res.json())
      .then(data => {
          console.log(data)
          if (data.ok) {
              setIsAdmin(true)
          }
          else{
              setIsAdmin(false)
          }
      })
      .catch(err => {
          console.log(err)
      })
}




React.useEffect(() => {    // if logged the button should display to log out 
    checklogin()
    checkAdminlogin()
}, [showpopup])


const handleLogout = () => {
  fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/auth/logout', {
      method: 'POST',
      credentials: 'include',
  })
  .then(res => res.json())
  .then(data => {
      if (data.ok) {
          setIsloggedin(false); // Update the state to indicate logout
          setIsAdmin(false)
          window.location.href = '/'; // Redirect to the home page
      } else {
          // Handle error if needed
          console.error("Logout failed:", data.message);
      }
  })
  .catch(err => {
      console.error("Error during logout:", err);
  });
};



  return (
    
    <nav>
         <Image src={logo} alt="Logo" />
         <Link href='/'>Home</Link>
     {isloggedin && <Link href='bmicalculator'>BMI Calculator</Link>}  
       {isloggedin && <Link href="/meditation">Mental Wellbeing</Link>}
        <Link href='/about'>About</Link> 
        {isloggedin && <Link href="/profile"><IoIosBody /></Link>}
        {(isloggedin ||isAdmin) ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={() => setShowpopup(true)}>Login</button>
      )}
        {
          showpopup && <Authpopup setShowpopup={setShowpopup}/> //if showpopup is true ,then goto AuthPopup,setShowpop as a propery for Authpopup
        }
       
    </nav>
   
  )
}

export default Navbar