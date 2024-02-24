import React from 'react'
import './AuthPopup.css'
import logo from './logo.png'
import Input from '@mui/joy/Input';
import Image from 'next/image'
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
const Authpopup = () => {
  
  const [showsignup,setShowsignup] = React.useState<boolean>(false)
  const handleLogin =()=>{}
  const handleSignup =()=>{}
  return (
    <div className='popup'>
      {
        showsignup?(
            
                <div className='authform'>
                 <div className='left'>
                    <Image src={logo} alt="FitLife"/>
                </div>
                <div className='right'>
                    <h1>Signup to FitLife!</h1>
                    <form action="">
                    <Input size='lg' placeholder="Email" variant="outlined" />
                    <Input size='lg' placeholder="Password" variant="outlined"
                    type='password' />
                    <div className='form_input_leftright'>
                      <Input size='lg' type="number" placeholder="Age" variant="outlined" />
                    <Input size='lg' type="number" placeholder="Weight" variant="outlined" />
                    </div>
                
                    <Select
                            color="neutral"
                            placeholder="Gender"
                             size="lg"
                            variant="outlined"
                    >
                        <Option value='male'>Male</Option>
                        <Option value='female'>Female</Option>
                        <Option value='other'>Other</Option>
                    </Select>
                    <label htmlFor=''>Height</label>
                    <div className='form_input_leftright'>
                        {/*5ft11inch*/}
                        <Input size='lg' type="number" placeholder="Feet" variant="outlined" />
                    <Input size='lg' type="number" placeholder="Inches" variant="outlined" />
                    </div>
                    <button
                    onClick={()=>{
                        handleLogin()
                    }}>SignUp</button>
                    </form>
                    <div>Already a member? <button onClick={
                    () => {
                        setShowsignup(false)
                    }
                }>LogIn</button>
                </div>
            </div>
            </div>
        ):
        (
            <div className='authform'>
                <div className='left'>
                    <Image src={logo} alt="FitLife"/>
                </div>
                <div className='right'>
                    <h1>Login to FitLife!</h1>
                    <form action="">
                    <Input placeholder="Email" variant="outlined" />
                    <Input placeholder="Password" variant="outlined"
                    type='password' />
                    <button
                    onClick={()=>{
                        handleLogin()
                    }}>LogIn</button>
                    </form>
                    <div className='otherwise'>Don't have an account?  <button onClick={
                    () => {
                        setShowsignup(true)
                    }
                }>Signup</button>
                </div>
            </div>
               
            </div>
        )
      }
    </div>
  )
}

export default Authpopup
