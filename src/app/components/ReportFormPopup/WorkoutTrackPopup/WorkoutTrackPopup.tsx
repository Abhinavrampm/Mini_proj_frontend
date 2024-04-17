import React from 'react'
import '../popup.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AiFillDelete, AiOutlineClose } from 'react-icons/ai'
//import DatePicker from "react-horizontal-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { toast } from "react-toastify"
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'


interface WorkoutPopupProps {
  setShowWorkoutPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const WorkoutPopup: React.FC<WorkoutPopupProps> = ({ setShowWorkoutPopup }) => {
  const [date, setDate] = React.useState(dayjs(new Date()));
  const [time, setTime] = React.useState(dayjs(new Date()));
  const [workoutTrack , setWorkoutTrack] = React.useState<any>({
    date:'',
    exercise:'',
    durationInMinutes:''
 })

 const [items,setItems] = React.useState<any>([]) //previously stored sleep data


  const saveWorkoutEntry = async () => {
 

    let tempdate = date.format('YYYY-MM-DD')
    let temptime = time.format('HH:mm:ss')    //get time and merge it with the date when a food is eaten
    let tempdatetime = tempdate + ' ' + temptime //to merge date and time 
    let finaldatetime = new Date(tempdatetime) //convert this to date object

    console.log(finaldatetime)

    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/workouttrack/addworkoutentry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            
        },
        credentials: 'include',
        body: JSON.stringify({
          date:finaldatetime,
          exercise:workoutTrack.exercise,
          durationInMinutes:workoutTrack.durationInMinutes
        })
        
    })
      .then(res=>res.json())
      .then(data => {
        if(data.ok){
          toast.success('Workout Data added successfully')
          getWorkout()  
          window.location.reload();  
        }
        else{
          toast.error('Error in adding workout data')
        }
      })
      .catch((err) => {
        toast.error("Error in adding catch")
        console.log(err)
      })
    };

    const getWorkout = async() =>{
        setItems([])        //hook initialized as empty
        fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/workouttrack/getworkoutsbydate', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
              
          },
          credentials: 'include',
          body: JSON.stringify({
            date:date
          })
          
      })
      .then(res=>res.json())
      .then(data => {
        if(data.ok){
         console.log(data.data,'Workouts data for date')
          setItems(data.data)  
        }
        else{
          toast.error('Error in adding workoutdata')
        }
      })
      .catch((err) => {
        toast.error("Error in adding catch")
        console.log(err)
      })
 }
 const deleteWorkoutData = async(item:any) =>{
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/workouttrack/deleteworkoutentry', {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
          
      },
      credentials: 'include',
      body: JSON.stringify({
        date:item.date
      })
  })
  .then(res=>res.json())
  .then(data => {
    if(data.ok){
     console.log('Workout data deleted')
     toast.success('Workout data deleted')
      getWorkout();
    }
    else{
      toast.error('Error in deleting sleep data')
    }
  })
  .catch((err) => {
    toast.error("Error in deleting ")
    console.log(err)
  })
  }
   
  React.useEffect(()=>{
    getWorkout()
  },[date])         
   
  const selectedDay = (val:any) => {
    setDate(val)
  };  

  

  return (
    <div className='popupout'>
    <div className='popupbox'>
      <button className='close'
       onClick={()=>{
        setShowWorkoutPopup(false)
       }}>
          <AiOutlineClose />
      </button>
       <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
        label="Select Date"
        value={date}
        onChange={(newValue:any)=>{
          selectedDay(newValue);
        }} />
       </LocalizationProvider>
       <TextField id="outlined-basic"
       label='Workout Name'
       variant='outlined'
       color='warning'
       onChange={(e)=>{
        setWorkoutTrack({ ...workoutTrack,exercise:e.target.value})
       }} />

    <TextField id="outlined-basic"
       label='Duration In Minutes'
       variant='outlined'
       color='warning'
       onChange={(e)=>{
        setWorkoutTrack({ ...workoutTrack,durationInMinutes:e.target.value})
       }} />

     <Button variant='contained'
     color='warning'
     onClick={saveWorkoutEntry}>
        Save
     </Button>
     <div className='hrline'></div>
     <div className='items'>
      {
        items.map((item:any) => {
          return (
            <div  className='item'>
              <h3>{item.date}</h3>
              <h3>{item.exercise} </h3>
              <h3>{item.durationInMinutes}mins </h3>
              <button
              onClick={
                () => {
                  deleteWorkoutData(item);
                }
              }>< AiFillDelete/> </button>
            </div>
          )
        })
      }
      
      </div>  
    </div>
</div>
  )

};


export default WorkoutPopup;