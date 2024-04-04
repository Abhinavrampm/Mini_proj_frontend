"use client"
import React from 'react'
import { LineChart } from '@mui/x-charts/LineChart';
import './ReportPage.css'
import { AiFillEdit } from 'react-icons/ai'
import CaloriIntakePopup from '../../components//ReportFormPopup/CalorieIntakePopup/CalorieIntakePopup';
import { usePathname } from 'next/navigation';    //to navigate to the path we want 

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
}

React.useEffect(() => {
    getDataForS1()
}, [])

const [showCalorieIntakePopup, setShowCalorieIntakePopup] = React.useState<boolean>(false)


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
                else{
                    // show popup for other reports
                    alert('show popup for other reports')
                }
            }}
            >
              <AiFillEdit />
              </button>
              {
                showCalorieIntakePopup &&

               <CaloriIntakePopup setShowCalorieIntakePopup={setShowCalorieIntakePopup} />  //passing the value to other page

            }
        </div>
    )
}

export default page