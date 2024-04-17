"use client"
import React, { useState, useEffect } from 'react';
import './Workoutpage.css';
import { useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify';


const page = () => {
  const [data, setData] = useState<any>(null); // Type Workout or null
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
  const searchParams = useSearchParams();
  const workoutid = searchParams.get('id');

 
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



  const handleNextExercise = () => {
    if (data && data.exercises && currentExerciseIndex < data.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  };

  const handlePrevExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  };

  return (
    <div>
      {data && (
        <div className='workout'>
          <h1 className='mainhead1'>{data.name} Day</h1>
          <div className='workout_exercises'>
            <div className='workout__exercise'>
              <h3>{currentExerciseIndex + 1}</h3>
              <div className='workout_exercise_image'>
                {data.exercises && data.exercises[currentExerciseIndex] && (
                  <img src={data.exercises[currentExerciseIndex].imageURL} alt='' />
                )}
              </div>
              <div className='workout_exercises_content'>
                {data.exercises && data.exercises[currentExerciseIndex] && (
                  <>
                    <h2 style={{ color: 'black' }}>{data.exercises[currentExerciseIndex].name}</h2>
                    <span style={{ color: 'black' }}>
                      {data.exercises[currentExerciseIndex].sets} sets x {data.exercises[currentExerciseIndex].reps} reps
                    </span>
                    <p style={{ color: 'black' }}>{data.exercises[currentExerciseIndex].description}</p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className='navigation-buttons'>
            <button onClick={handlePrevExercise} disabled={currentExerciseIndex === 0}>Previous</button>
            <button onClick={handleNextExercise} disabled={!data || !data.exercises || currentExerciseIndex === (data.exercises.length || 0) - 1}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
