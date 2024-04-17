"use client"
import React from 'react'
import { LineChart } from '@mui/x-charts/LineChart';
import './ReportPage.css'
import { AiFillEdit } from 'react-icons/ai'
import CaloriIntakePopup from '../../components//ReportFormPopup/CalorieIntakePopup/CalorieIntakePopup';
import SleepPopUp from '../../components//ReportFormPopup/SleepPopup/SleepPopup';
import { usePathname } from 'next/navigation';    //to navigate to the path we want 
import WaterPopup from '@/app/components/ReportFormPopup/WaterIntakePopup/WaterIntakePopup';
import StepPopup from '@/app/components/ReportFormPopup/StepPopup/StepPopup';
import WorkoutTrackPopup from '@/app/components/ReportFormPopup/WorkoutTrackPopup/WorkoutTrackPopup';


const page = () => {
    const color = 'blue'
    const pathname = usePathname();
    console.log(pathname)
    const chartsParams = {
        // margin: { bottom: 20, left: 25, right: 5 },
        height: 300,

    };

    const [dataS1, setDataS1] = React.useState<any>(null)
    const getDataForS1 = async () => {
        if(pathname == '/report/Calorie%20Intake'){
            fetch(process.env.NEXT_PUBLIC_BACKEND_API+'/calorieintake/getcalorieintakebylimit',{
                method:'POST',
                credentials:'include',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({ limit: 10 }) //for last 10 days
            })
            .then(res => res.json())
            .then(data => {
                if(data.ok){
                    let temp = data.data.map((item:any)=> {
                        return {
                            date : item.date,
                            value : item.calorieIntake,
                            unit : 'kcal'                   //same for other api
                        }
                    })
                    let dataForLineChart = temp.map((item: any) => {
                        let val = JSON.stringify(item.value)
                        return val
                    })
                
                    let dataForXAxis = temp.map((item: any) => {
                        let val = new Date(item.date)
                        return val
                    })
                
                    console.log({
                        data: dataForLineChart,
                        title: '1 Day Calorie Intake',
                        color: color,
                        xAxis: {
                            data: dataForXAxis,
                            label: 'Last 10 Days',
                            scaleType: 'time'
                        }
                    })
                
                    setDataS1({
                        data: dataForLineChart,
                        title: '1 Day Calorie Intake',
                        color: color,
                        xAxis: {
                            data: dataForXAxis,
                            label: 'Last 10 Days',
                            scaleType: 'time'
                        }
                    })

                }

                
                else{
                    setDataS1([])
                }
            })
        }
        if(pathname == '/report/Sleep'){
            fetch(process.env.NEXT_PUBLIC_BACKEND_API+'/sleeptrack/getsleepbylimit',{
                method:'POST',
                credentials:'include',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({ limit: 10 }) //for last 10 days
            })
            .then(res => res.json())
            .then(data => {
                if(data.ok){
                    let temp = data.data.map((item:any)=> {
                        return {
                            date : item.date,
                            value : item.durationInHrs,
                            unit : 'hrs'                   //same for other api
                        }
                    })
                    let dataForLineChart = temp.map((item: any) => {
                        let val = JSON.stringify(item.value)
                        return val
                    })
                
                    let dataForXAxis = temp.map((item: any) => {
                        let val = new Date(item.date)
                        return val
                    })
                
                    console.log({
                        data: dataForLineChart,
                        title: 'Sleep per Day',
                        color: color,
                        xAxis: {
                            data: dataForXAxis,
                            label: 'Last 10 Days',
                            scaleType: 'time'
                        }
                    })
                
                    setDataS1({
                        data: dataForLineChart,
                        title: 'Sleep Per Day ',
                        color: color,
                        xAxis: {
                            data: dataForXAxis,
                            label: 'Last 10 Days',
                            scaleType: 'time'
                        }
                    })

                }

                
                else{
                    setDataS1([])
                }
            })
        }
        if(pathname == '/report/Water'){
            fetch(process.env.NEXT_PUBLIC_BACKEND_API+'/watertrack/getwaterbylimit',{
                method:'POST',
                credentials:'include',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({ limit: 10 }) //for last 10 days
            })
            .then(res => res.json())
            .then(data => {
                if(data.ok){
                    let temp = data.data.map((item:any)=> {
                        return {
                            date : item.date,
                            value : item.amountInMilliliters,
                            unit : 'ml'                   //same for other api
                        }
                    })
                    let dataForLineChart = temp.map((item: any) => {
                        let val = JSON.stringify(item.value)
                        return val
                    })
                
                    let dataForXAxis = temp.map((item: any) => {
                        let val = new Date(item.date)
                        return val
                    })
                
                    console.log({
                        data: dataForLineChart,
                        title: 'Water intake per Day',
                        color: color,
                        xAxis: {
                            data: dataForXAxis,
                            label: 'Last 10 Days',
                            scaleType: 'time'
                        }
                    })
                
                    setDataS1({
                        data: dataForLineChart,
                        title: 'Water Intake Per Day ',
                        color: color,
                        xAxis: {
                            data: dataForXAxis,
                            label: 'Last 10 Days',
                            scaleType: 'time'
                        }
                    })

                }

                
                else{
                    setDataS1([])
                }
            })
        }
        if(pathname == '/report/Steps'){
            fetch(process.env.NEXT_PUBLIC_BACKEND_API+'/steptrack/getstepsbylimit',{
                method:'POST',
                credentials:'include',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({ limit: 10 }) //for last 10 days
            })
            .then(res => res.json())
            .then(data => {
                if(data.ok){
                    let temp = data.data.map((item:any)=> {
                        return {
                            date : item.date,
                            value : item.steps,
                                            //same for other api
                        }
                    })
                    let dataForLineChart = temp.map((item: any) => {
                        let val = JSON.stringify(item.value)
                        return val
                    })
                
                    let dataForXAxis = temp.map((item: any) => {
                        let val = new Date(item.date)
                        return val
                    })
                
                    console.log({
                        data: dataForLineChart,
                        title: 'Step intake per Day',
                        color: color,
                        xAxis: {
                            data: dataForXAxis,
                            label: 'Last 10 Days',
                            scaleType: 'time'
                        }
                    })
                
                    setDataS1({
                        data: dataForLineChart,
                        title: 'Step Intake Per Day ',
                        color: color,
                        xAxis: {
                            data: dataForXAxis,
                            label: 'Last 10 Days',
                            scaleType: 'time'
                        }
                    })

                }

                
                else{
                    setDataS1([])
                }
            })
        }
        if(pathname == '/report/Workout'){
            fetch(process.env.NEXT_PUBLIC_BACKEND_API+'/workouttrack/getworkoutsbylimit',{
                method:'POST',
                credentials:'include',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({ limit: 10 }) //for last 10 days
            })
            .then(res => res.json())
            .then(data => {
                if(data.ok){
                    let temp = data.data.map((item:any)=> {
                        return {
                            date : item.date,
                            value : item.durationInMinutes,
                            unit:'mins'
                                            //same for other api
                        }
                    })
                    let dataForLineChart = temp.map((item: any) => {
                        let val = JSON.stringify(item.value)
                        return val
                    })
                
                    let dataForXAxis = temp.map((item: any) => {
                        let val = new Date(item.date)
                        return val
                    })
                
                    console.log({
                        data: dataForLineChart,
                        title: 'Workouts Per Day',
                        color: color,
                        xAxis: {
                            data: dataForXAxis,
                            label: 'Last 10 Days',
                            scaleType: 'time'
                        }
                    })
                
                    setDataS1({
                        data: dataForLineChart,
                        title: 'Workouts Per Day ',
                        color: color,
                        xAxis: {
                            data: dataForXAxis,
                            label: 'Last 10 Days',
                            scaleType: 'time'
                        }
                    })

                }

                
                else{
                    setDataS1([])
                }
            })
        }



} 
 

React.useEffect(() => {
    getDataForS1()
}, [])

const [showCalorieIntakePopup, setShowCalorieIntakePopup] = React.useState<boolean>(false)
const [showWaterPopup, setShowWaterPopup] = React.useState<boolean>(false)
const [showSleepPopup, setShowSleepPopup] = React.useState<boolean>(false)
const [showStepPopup, setShowStepPopup] = React.useState<boolean>(false)
const [showWorkoutPopup, setShowWorkoutPopup] = React.useState<boolean>(false)
    return (
        <div className='reportpage'>
       
        
            <div className='s1'>
                {
                    dataS1 &&
                    <LineChart
                    xAxis={[{ 
                      id: 'Day',
                      data: dataS1.xAxis.data,
                      scaleType: dataS1.xAxis.scaleType,
                      label: dataS1.xAxis.label,
                    
                    
                      
                   }]}
                    series={[
                      {
                        data: dataS1.data,
                        label: dataS1.title,
                        color: dataS1.color,
                      },
                    ]}
                    width={500}
                        {...chartsParams}
                    />
                }
            </div>
            {/* <div className='s2'>
                {
                    dataS1 &&
                    <LineChart
                        xAxis={[{
                            id: 'Day',
                            data: dataS1.xAxis.data,
                            scaleType: dataS1.xAxis.scaleType,
                            label: dataS1.xAxis.label,
                        }]}
                        series={[
                            {
                                data: dataS1.data,
                                label: dataS1.title,
                                color: dataS1.color,
                            },
                        ]}
                        {...chartsParams}
                    />
                }
            </div>

            <div className='s3'>
                {
                    dataS1 &&
                    <LineChart
                        xAxis={[{
                            id: 'Day',
                            data: dataS1.xAxis.data,
                            scaleType: dataS1.xAxis.scaleType,
                            label: dataS1.xAxis.label,
                        }]}
                        series={[
                            {
                                data: dataS1.data,
                                label: dataS1.title,
                                color: dataS1.color,
                            },
                        ]}
                        {...chartsParams}
                    />
                }
            </div>

            <div className='s4'>
                {
                    dataS1 &&
                    <LineChart
                        xAxis={[{
                            id: 'Day',
                            data: dataS1.xAxis.data,
                            scaleType: dataS1.xAxis.scaleType,
                            label: dataS1.xAxis.label,
                          
                        }]}
                        series={[
                            {
                                data: dataS1.data,
                                label: dataS1.title,
                                color: dataS1.color,
                            },
                        ]}
                        {...chartsParams}
                    />
                }
            </div> */}
            <button className='editbutton'
            onClick={()=>{
                if (pathname == '/report/Calorie%20Intake'){
              setShowCalorieIntakePopup(true);
            }
             if(pathname == '/report/Sleep' ){
                    setShowSleepPopup(true);
                }
                if(pathname == '/report/Water' ){
                    setShowWaterPopup(true);
                }
                if(pathname == '/report/Steps' ){
                    setShowStepPopup(true);
                }
                if(pathname == '/report/Workout' ){
                    setShowWorkoutPopup(true);
                }
                
            }}
            >
              <AiFillEdit />
              </button>
              {
                showCalorieIntakePopup &&

               <CaloriIntakePopup setShowCalorieIntakePopup={setShowCalorieIntakePopup} />  //passing the value to other page

            },
            {
                showSleepPopup && 
                
                <SleepPopUp setShowSleepPopup = {setShowSleepPopup}/>
            },
            {
                showWaterPopup && 
                <WaterPopup setShowWaterPopup={setShowWaterPopup} />
            },
            {
                showStepPopup &&
                <StepPopup setShowStepPopup={setShowStepPopup}/>
            },
            {
                showWorkoutPopup &&
                <WorkoutTrackPopup setShowWorkoutPopup={setShowWorkoutPopup}/>

            }
        </div>
    )
}

export default page