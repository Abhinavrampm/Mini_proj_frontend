import React from 'react'
import '../popup.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AiFillDelete, AiOutlineClose } from 'react-icons/ai'
//import DatePicker from "react-horizontal-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify"
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'


interface StepTrackProps {
  setShowStepPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const StepPopup: React.FC<StepTrackProps> = ({ setShowStepPopup }) => {
  const [date, setDate] = React.useState(dayjs(new Date()));
  const [time, setTime] = React.useState(dayjs(new Date()));
  const [stepTrack , setStepTrack] = React.useState<any>({
    date:'',
    steps:''
 })

 const [items,setItems] = React.useState<any>([]) //previously stored sleep data


  const saveStepEntry = async () => {
    

    let tempdate = date.format('YYYY-MM-DD')
    let temptime = time.format('HH:mm:ss')    //get time and merge it with the date when a food is eaten
    let tempdatetime = tempdate + ' ' + temptime //to merge date and time 
    let finaldatetime = new Date(tempdatetime) //convert this to date object

    console.log(finaldatetime)

    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/steptrack/addstepentry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            
        },
        credentials: 'include',
        body: JSON.stringify({
          date:finaldatetime,
          steps : stepTrack.steps
        })
        
    })
      .then(res=>res.json())
      .then(data => {
        if(data.ok){
          toast.success('Steps added successfully')
          getStep()
          window.location.reload();    
        }
        else{
          toast.error('Error in adding steps data')
        }
      })
      .catch((err) => {
        toast.error("Error in adding catch")
        console.log(err)
      })
    };

    const getStep = async() =>{
        setItems([])        //hook initialized as empty
        fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/steptrack/getstepsbydate', {
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
         console.log(data.data,'Step intake data for date')
          setItems(data.data)  
        }
        else{
          toast.error('Error in adding Step Intake')
        }
      })
      .catch((err) => {
        toast.error("Error in adding catch")
        console.log(err)
      })
 }
 const deleteStepEntry = async(item:any) =>{
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/steptrack/deletestepentry', {
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
     console.log('Steps data deleted')
     toast.success('Steps data deleted')
      getStep();
    }
    else{
      toast.error('Error in deleting step data')
    }
  })
  .catch((err) => {
    toast.error("Error in deleting ")
    console.log(err)
  })
  }
   
  React.useEffect(()=>{
    getStep()
  },[date])         
   
  const selectedDay = (val:any) => {
    setDate(val)
  };  

  

  return (
    <div className='popupout'>
    <div className='popupbox'>
      <button className='close'
       onClick={()=>{
        setShowStepPopup(false)
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
       label='Steps covered'
       variant='outlined'
       color='warning'
       onChange={(e)=>{
        setStepTrack({ ...stepTrack,steps:e.target.value})
       }} />

     <Button variant='contained'
     color='warning'
     onClick={saveStepEntry}>
        Save
     </Button>
     <div className='hrline'></div>
     <div className='items'>
      {
        items.map((item:any) => {
          return (
            <div  className='item'>
              <h3>{item.date}</h3>
              <h3>{item.steps} </h3>
              <button
              onClick={
                () => {
                  deleteStepEntry(item);
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


export default StepPopup;