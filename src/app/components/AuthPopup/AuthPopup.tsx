import React from 'react'
import './AuthPopup.css'
import logo from './logo.png'
import Input from '@mui/joy/Input';
import Image from 'next/image'
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { AiFillDelete, AiOutlineClose } from 'react-icons/ai'
import dayjs from 'dayjs';


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { ToastContainer, toast } from 'react-toastify';



interface AuthPopupProps{
    setShowpopup:React.Dispatch<React.SetStateAction<boolean>>;
}

interface SignupFormData {
    name: String | null,
    email: String | null,
    password: String | null,
    weightInKg: Number | null,
    heightInCm: Number | null,
    goal: String | null,
    gender: String | null,
    dob: Date | null,
    activityLevel: String | null
}

const Authpopup:React.FC<AuthPopupProps> = ({setShowpopup}) => {
  
  const [showsignup,setShowsignup] = React.useState<boolean>(false)
  const [signupformData, setSignupFormData] = React.useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    weightInKg: 0.0,
    heightInCm: 0.0,
    goal: '',
    gender: '',
    dob: new Date(),
    activityLevel: ''
})

const [loginformData, setLoginFormData] = React.useState({
    email: '',
    password: '',
})
const handleAdminLogin =  () => {
        console.log(loginformData);
        fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginformData),
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)

            if(data.ok){
                toast.success(data.message)
                console.log("Admin authenticated successfully")
                setShowpopup(false)
                window.location.reload();
               
            }
        })
};


const handleLogin = () => {
    console.log(loginformData);

    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginformData),
        credentials: 'include'
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)

            if (data.ok) {
                toast.success(data.message)

                setShowpopup(false)
                window.location.reload();
               
            }
            else {
                toast.error(data.message)
            }
        }).catch(err => {
            console.log(err)
        })




}
const handleSignup = ()=>{
    console.log(signupformData);            //to verify the data in console

    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupformData),
        credentials: 'include'
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)

            if (data.ok) {                      //indicates successful login
                toast.success(data.message)

                setShowsignup(false)
                window.location.reload();
            }
            else {
                toast.error(data.message)
            }
        }).catch(err => {
            console.log(err)
        })

  }
  return (
    <div className='popup'>
        <button className='close'
        onClick={()=>{
            setShowpopup(false)
        }}
        
        ><AiOutlineClose /></button>
      {
        showsignup?(
            
                <div className='authform'>
                 <div className='left'>
                    <Image src={logo} alt="FitLife"/>
                </div>

                <div className='right'>
                    <h1>Signup to FitLife!</h1>
                    <form action="">
                    <Input
                                    placeholder="name"
                                    size="lg"
                                    variant="plain"
                                    onChange={(e) => {
                                        setSignupFormData({                
                                            ...signupformData,
                                            name: e.target.value
                                        })
                                    }}
                                />
                                <Input
                                    
                                    placeholder="email"
                                    size="lg"
                                    variant="solid"

                                    onChange={(e) => {
                                        setSignupFormData({
                                            ...signupformData,
                                            email: e.target.value
                                        })
                                    }}
                                />
                                <Input
                                    
                                    placeholder="password"
                                    size="lg"
                                    variant="solid"
                                    type='password'

                                    onChange={(e) => {
                                        setSignupFormData({
                                            ...signupformData,
                                            password: e.target.value
                                        })
                                    }}
                                />


                                <Input  size="lg" variant="solid" type="number" placeholder='Weight in kg'
                                    onChange={(e) => {
                                        setSignupFormData({
                                            ...signupformData,
                                            weightInKg: parseFloat(e.target.value)
                                        })
                                    }}
                                />

                                <Select
                                   
                                    placeholder="Activity Level"
                                    size="lg"
                                    variant="solid"

                                    onChange={(
                                        event: React.SyntheticEvent | null,                  //onchange method different for MUI
                                        newValue: string | null,
                                    ) => {
                                        setSignupFormData({
                                            ...signupformData,
                                            activityLevel: newValue?.toString() || ''
                                        })
                                    }}
                                >
                                    <Option value="sedentary">Sedentary</Option>
                                    <Option value="light">Light</Option>
                                    <Option value="moderate">Moderate</Option>
                                    <Option value="active">Active</Option>
                                    <Option value="veryActive">Very Active</Option>
                                </Select>

                                <Select
                                   
                                    placeholder="Goal"
                                    size="lg"
                                    variant="solid"

                                    onChange={(
                                        event: React.SyntheticEvent | null,
                                        newValue: string | null,
                                    ) => {
                                        setSignupFormData({
                                            ...signupformData,
                                            goal: newValue?.toString() || ''
                                        })
                                    }}
                                >
                                    <Option value="weightLoss">Lose</Option>
                                    <Option value="weightMaintain">Maintain</Option>
                                    <Option value="weightGain">Gain</Option>
                                </Select>

                                <Select
                                    
                                    placeholder="Gender"
                                    size="lg"
                                    variant="solid"

                                    onChange={(
                                        event: React.SyntheticEvent | null,
                                        newValue: string | null,
                                    ) => {
                                        setSignupFormData({
                                            ...signupformData,
                                            gender: newValue?.toString() || ''
                                        })
                                    }}
                                >
                                    <Option value="male">Male</Option>
                                    <Option value="female">Female</Option>
                                    <Option value="other">Other</Option>
                                </Select>

                                <label htmlFor="">Height</label>


                                <Input size="lg" variant="plain" type="number" placeholder='cm'
                                    onChange={(e) => {
                                        setSignupFormData({
                                            ...signupformData,
                                            heightInCm: parseFloat(e.target.value)              //height converted in cm
                                        })
                                    }}
                                />

                                <label htmlFor="">Date of Birth</label>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >                
                                    <DesktopDatePicker defaultValue={dayjs(new Date())}         //mui datepicker for choosing DOB
                                        sx={{
                                            backgroundColor: 'white',
                                        }}

                                        onChange={(newValue) => {
                                            setSignupFormData({
                                                ...signupformData,
                                                dob: new Date(newValue as any)
                                            })
                                        }}
                                    />
                                </LocalizationProvider>

                    <button
                    onClick={(e)=>{
                        e.preventDefault()
                        handleSignup()
                    }}>SignUp</button>
                    </form>

                    <div className='form_else'>Already a member? <button onClick={
                    (e) => {
                        setShowsignup(false)
                        // e.preventDefault()
                        // handleLogin()
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
                    <Input
                                    color="warning"
                                    placeholder="email"
                                    size="lg"
                                    variant="solid"
                                    onChange={(e) => {
                                        setLoginFormData({
                                            ...loginformData,
                                            email: e.target.value
                                        })
                                    }}
                                />

                                <Input
                                    color="warning"
                                    placeholder="password"
                                    size="lg"
                                    variant="solid"
                                    type='password'

                                    onChange={(e) => {
                                        setLoginFormData({
                                            ...loginformData,
                                            password: e.target.value
                                        })
                                    }}
                                />
                    <button
                    onClick={(e) => {
                        e.preventDefault();
                        if (loginformData.email.includes('.admin')) {
                            handleAdminLogin();
                        } else {
                            handleLogin();
                        }
                    }}
                    >LogIn</button>
                    </form>
                    <div className='form_else1'>Don't have an account?  <button onClick={
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
