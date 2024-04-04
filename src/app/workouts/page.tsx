"use client"
import React from 'react'
import './Workoutpage.css'
import { useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify';

const page = () => {
  const [ data,setData ] = React.useState<any>(null)
  const searchParams = useSearchParams();
  const workoutid = searchParams.get('id')

  const getWorkout = async()=>{
     fetch(process.env.NEXT_PUBLIC_BACKEND_API+'/workoutplans/workouts/'+workoutid,{
          method:'GET',
          credentials:'include'
     })
     .then(res => res.json())
     .then(data => {
        console.log(data)
        if(data.ok){
          setData(data.data)
        }
        else{
          setData(null)
        }
     })
     .catch(err => {
      console.log(err)
     })

     
    }

    React.useEffect(() => {
        getWorkout()
    }, [])

  return (
   <>
    {
      data && 
      <div className='workout'>
        <h1 className='mainhead1'>{data?.name} Day</h1>
        <div className='workout_exercises'>
          {
            data?.exercises.map((item: any,index:number) => {
              return (
                <div className={
                  index % 2 === 0 ? 'workout__exercise' : 'workout__exercise workout__exercise--reverse'
              }>
                 <h3>{index+1}</h3>
                 <div className='workout_exercise_image'>
                  <img src={item.imageURL} alt=""/>
                 </div>
                 <div className='workout_exercises_content'>
                 <h2 style={{ color: 'black' }}>{item.name}</h2>
                 <span style={{ color: 'white' }}>{item.sets} sets x {item.reps} reps</span>
                 <p style={{ color: 'black' }}>{item.description}</p>
                 </div>
                </div>
              )
            })
          }
        </div>

      </div>
    }
   </>
  )
}

export default page
