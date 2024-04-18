"use client"
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import logo from './logo.png'
import Input from '@mui/joy/Input';
import Image from 'next/image'
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import {  AiOutlineClose } from 'react-icons/ai'
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import './SignUp.css'
const page = () => {

    interface SignupFormData {
        name: String | null;
        email: String | null;
        password: String | null;
        weightInKg: Number | null;
        heightInCm: Number | null;
        goal: String | null;
        gender: String | null;
        dob: Date | null;
        activityLevel: String | null;
    }

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

    const handleSignup = () => {
        console.log(signupformData); // to verify the data in console

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
                console.log(data);

                if (data.ok) { // indicates successful login
                    toast.success("Signed Up Successfully!!");
                    window.location.href='/'
                    window.location.reload();
                }
                else {
                    toast.error(data.message);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div className='forms'>
        <h1 className="signup-heading">Signup to FitLife!</h1>
        <form className="signup-form" action="">
            <input
                className="signup-input"
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
            <input
                className="signup-input"
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
            <input
                className="signup-input"
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
            <input
                className="signup-input"
                size="lg"
                variant="solid"
                type="number"
                placeholder='Weight in kg'
                onChange={(e) => {
                    setSignupFormData({
                        ...signupformData,
                        weightInKg: parseFloat(e.target.value)
                    })
                }}
            />
          
            <div className="signup-select-container">
                
                <Select
                                   
                                   placeholder="Activity Level"
                                   size="large"
                                   variant="outlined"
                                   sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#ccc',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#007bff',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#007bff',
                                        },
                                    },
                                    '& .MuiSelect-selectMenu': {
                                        padding: '10px',
                                        borderRadius: '10px',
                                        backgroundColor: '#fff',
                                    },
                                    '& option': {
                                        padding: '10px',
                                        backgroundColor: '#fff',
                                        color: '#333',
                                    },
                                }}
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
                                   size="large"
                                   variant="outlined"
                                   sx={{
                                       '& .MuiOutlinedInput-root': {
                                           '& fieldset': {
                                               borderColor: '#ccc',
                                           },
                                           '&:hover fieldset': {
                                               borderColor: '#007bff',
                                           },
                                           '&.Mui-focused fieldset': {
                                               borderColor: '#007bff',
                                           },
                                       },
                                       '& .MuiSelect-selectMenu': {
                                           padding: '10px',
                                           borderRadius: '5px',
                                           backgroundColor: '#fff',
                                       },
                                       '& option': {
                                           padding: '10px',
                                           backgroundColor: '#fff',
                                           color: '#333',
                                       },
                                   }}

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
                                   size="large"
                                   variant="outlined"
                                   sx={{
                                       '& .MuiOutlinedInput-root': {
                                           '& fieldset': {
                                               borderColor: '#ccc',
                                           },
                                           '&:hover fieldset': {
                                               borderColor: '#007bff',
                                           },
                                           '&.Mui-focused fieldset': {
                                               borderColor: '#007bff',
                                           },
                                       },
                                       '& .MuiSelect-selectMenu': {
                                           padding: '10px',
                                           borderRadius: '5px',
                                           backgroundColor: '#fff',
                                       },
                                       '& option': {
                                           padding: '10px',
                                           backgroundColor: '#fff',
                                           color: '#333',
                                       },
                                   }}

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
            </div>
            <label htmlFor="" className="signup-label">Height</label>
            <input
                className="signup-input"
                size="lg"
                variant="plain"
                type="number"
                placeholder='cm'
                onChange={(e) => {
                    setSignupFormData({
                        ...signupformData,
                        heightInCm: parseFloat(e.target.value)
                    })
                }}
            />
            <label htmlFor="" className="signup-label">Date of Birth</label>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DesktopDatePicker defaultValue={dayjs(new Date())}
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
                className="signup-button"
                onClick={(e)=>{
                    e.preventDefault()
                    handleSignup()
                }}
            >
                SignUp
            </button>
        </form>
    </div>
    

    );
}

export default page;
