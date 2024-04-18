"use client"
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

interface Workout {
  _id: string;
  name: string;
  description: string;
  durationInMinutes: number;
  exercises: Exercise[];
  imageURL: string;
}

interface Exercise {
  name: string;
  description: string;
  sets: number;
  reps: number;
  imageURL: string;
}

const page: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/workoutplans/workouts`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (response.ok) {
        setWorkouts(data.data);
      } else {
        toast.error(data.message || 'Failed to fetch workouts');
      }
    } catch (error) {
      console.error('Error fetching workouts:', error);
      toast.error('An error occurred while fetching workouts');
    }
  };

  const deleteWorkout = async (workoutId: string) => {
    try {
      console.log('Deleting workout with ID:', workoutId); // Log the workout ID before sending the request
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/workoutplans/workouts/${workoutId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      const data = await response.json();
      if (response.ok) {
        setWorkouts(prevWorkouts => prevWorkouts.filter(workout => workout._id !== workoutId));

        toast.success(data.message);
        console.log(data.message)
      } else {
        toast.error(data.message || 'Failed to delete workout');
      }
    } catch (error) {
      console.error('Error deleting workout:', error);
      toast.error('An error occurred while deleting workout');
    }
  };

  return (
    <div>
      <h1>Workouts</h1>
      {workouts.map(workout => (
        <div key={workout._id}>
          <h2>{workout.name}</h2>
          <p>Description: {workout.description}</p>
          <p>Duration: {workout.durationInMinutes} minutes</p>
          <button onClick={() => deleteWorkout(workout._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default page;
