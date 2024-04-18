"use client"

import React from 'react'
import './addWorkout.css'
import { toast, ToastPosition} from 'react-toastify'
import Swal from 'sweetalert2';

interface Workout{                          //to save the type of workouts into the database
  name:string;
  description:string;
  durationInMinutes:number;
  exercises:Exercise[];
  imageURL:string;
  
}
interface Exercise{
  name:string;
  description:string;
  sets:number;
  reps:number;
  imageURL:string;
  
}
const page = () => {
  const [workout,setWorkout] = React.useState<Workout>({
    name:'',
  description:'',
  durationInMinutes:0,
  exercises:[],             //to pass different exercises as an array type
  imageURL:'',
  
  });

  const [exercise,setExercise] = React.useState<Exercise>({
    name:'',
  description:'',
  sets:0,
  reps:0,
  imageURL:'',
 
  })

  const handleWorkoutChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setWorkout({
      ...workout,
      [e.target.name]:e.target.value
    })
  }
  const handleExerciseChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setExercise({
      ...exercise,
      [e.target.name]:e.target.value
    })
  }
  const addExerciseToWorkout = () =>{
      console.log(exercise) 
      if(exercise.name =='' || exercise.description == '' || exercise.sets == 0 || exercise.reps == 0 ||exercise.imageURL == null){
        toast.error('Please fill all the fields',{
          position: 'top-center',
        });
        return;
      } 
      setWorkout({
        ...workout,
        exercises:[...workout.exercises,exercise]
      })                                   //to add a current exercise to your workout    
  }
  const deleteExerciseFromWorkout = (index:number) =>{
                    setWorkout({
                      ...workout,
                      exercises:workout.exercises.filter((exercise,i) => i!==index)
                    })                      //to delete exercise from a workout plan    
}

const checkLogin = async() => {
             const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API+'/admin/checklogin',{
              method:'GET',
              headers:{
                'Content-Type':'application/json'
              },
              credentials:'include'
             });        
             if(response.ok){
              //admin is authenticated
              console.log('Admin is authenticated');
             }                 
             else {
              console.log('Admin is not authenticated')
              window.location.href = '/adminauth/login';  //redirect to login page if admin is not logged in
             }

}
const saveWorkout = async() => {
        //await checkLogin();  
        console.log(workout)

         if(workout.name =='' || workout.description == '' || workout.durationInMinutes == 0 || workout.imageURL == null ||workout.exercises.length == null){
          toast.error('Please fill all the fields',{
            position:"top-center"
          });
          return;
         }
        //  if(workout.imageFile){
        //   const imageURL = await uploadImage(workout.imageFile);
        //   if(imageURL){
        //     setWorkout({
        //       ...workout,
        //       imageURL            //to save the image url for workouts 
        //     })

        //   }
        //  }
        //  for(let i=0;i<workout.exercises.length;i++) {
        //   let temping = workout.exercises[i].imageURL
        //   // if(temping){
            
        //   //   workout.exercises[i].imageURL = imgURL;     //add the image url of each exercises
        //   // }
        //   console.log(workout.exercises[i].imageURL)
        //  }
         // post the workouts to backend
         const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/workoutplans/workouts`,{
          method:'POST',
          headers : {
            'Content-Type':'application/json',
          },
          body:JSON.stringify(workout),
          credentials:'include'
         });
         if(response.ok){
          console.log(workout)
          // Swal.fire({
          //   icon: 'success',
          //   title: 'Workout created successfully',
          //   showConfirmButton: false,
          //   timer: 1000
          // });
          toast.success('Workout created successfully',{
            position:'top-center'
          });

         }
         else {
          console.error('Workout creation failed',response.statusText);
          toast.error('Workout creation failed',{
            position:'top-center'
          });
         }
}



return (
  <div className="formpage">
    <h1 className="title">Add Workout</h1>
    <input
      type="text"
      placeholder="Workout Name"
      name="name"
      value={workout.name}
      onChange={handleWorkoutChange}
    />
    <textarea
      placeholder="Workout description"
      name="description"
      value={workout.description}
      onChange={handleWorkoutChange}
      rows={5}
      cols={50}
    />
    <input
      type="number"
      placeholder="Workout Duration"
      name="durationInMinutes"
      value={workout.durationInMinutes}
      onChange={handleWorkoutChange}
    />
    <input
      type="text"
      placeholder="Workout Image URL"
      name="imageURL"
      value={workout.imageURL}
      onChange={handleWorkoutChange}
    />
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h2 className="title">Add Exercise to Workout</h2>
      <input
        type="text"
        placeholder="Exercise Name"
        name="name"
        value={exercise.name}
        onChange={handleExerciseChange}
      />
      <textarea
        placeholder="Exercise description"
        name="description"
        value={exercise.description}
        onChange={handleExerciseChange}
        rows={5}
        cols={50}
      />
      <label htmlFor="sets">Sets</label>
      <input
        type="number"
        placeholder="Sets"
        name="sets"
        value={exercise.sets}
        onChange={handleExerciseChange}
      />
      <label htmlFor="reps">Reps</label>
      <input
        type="number"
        placeholder="Reps"
        name="reps"
        value={exercise.reps}
        onChange={handleExerciseChange}
      />
      <input
        type="text"
        placeholder="Exercise Image URL"
        name="imageURL"
        value={exercise.imageURL}
        onChange={handleExerciseChange}
      />
      <button onClick={addExerciseToWorkout}>Add Exercise</button>
    </div>
    <div className="exercises">
      {workout.exercises.map((exercise, index) => (
        <div className="exercise" key={index}>
          <h2>{exercise.name}</h2>
          <p>{exercise.description}</p>
          <p>{exercise.sets}</p>
          <p>{exercise.reps}</p>
          <p>{exercise.imageURL}</p>
          <button onClick={() => deleteExerciseFromWorkout(index)}>Delete Workout</button>
        </div>
      ))}
    </div>
    <button onClick={saveWorkout}>Add Workout</button>
  </div>
);
};

export default page;