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
interface CaloriIntakePopupProps {
  setShowCalorieIntakePopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const CalorieIntakePopup: React.FC<CaloriIntakePopupProps> = ({ setShowCalorieIntakePopup }) => {
 const [date,setDate] = React.useState<any>(dayjs( new Date()))
 const [time,setTime] = React.useState<any>(dayjs(new Date()))
 
 const [calorieIntake , setCalorieIntake] = React.useState<any>({
    item:'',
    date:'',
    quantity:'',
    quantitytype:'g'
 })
 const [items,setItems] = React.useState<any>([])   //previosly stored calorie intake value


const saveCalorieIntake = async() =>{
    let tempdate = date.format('YYYY-MM-DD')
    let temptime = time.format('HH:mm:ss')    //get time and merge it with the date when a food is eaten
    let tempdatetime = tempdate + ' ' + temptime //to merge date and time 
    let finaldatetime = new Date(tempdatetime) //convert this to date object

    console.log(finaldatetime)
    //save the data to backend 
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/calorieintake/addcalorieintake', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
          
      },
      credentials: 'include',
      body: JSON.stringify({
        item:calorieIntake.item,
        date:finaldatetime,
        quantity:calorieIntake.quantity,
        quantitytype:calorieIntake.quantitytype
      })
      
  })
    .then(res=>res.json())
    .then(data => {
      if(data.ok){
        toast.success('Calorie intake added successfully')
        getCalorieIntake()    //to calculate the entire calorie consumed that day
        window.location.reload();
               
      }
      else{
        toast.error('Error in adding calorie intake')
      }
    })
    .catch((err) => {
      toast.error("Error in adding catch")
      console.log(err)
    })
  }
const getCalorieIntake = async() =>{
  setItems([])        //hook initialized as empty
  fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/calorieintake/getcalorieintakebydate', {
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
   console.log(data.data,'calorie intake data for date')
    setItems(data.data)  
  }
  else{
    toast.error('Error in adding calorie intake')
  }
})
.catch((err) => {
  toast.error("Error in adding catch")
  console.log(err)
})

}
const deleteCalorieIntake = async(item:any) =>{
  fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/calorieintake/deletecalorieintake', {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
        
    },
    credentials: 'include',
    body: JSON.stringify({
      item:item.item,
      date:item.date
    })
})
.then(res=>res.json())
.then(data => {
  if(data.ok){
   console.log('calorie intake item deleted')
   toast.success('calorie intake deleted')
    getCalorieIntake()
  }
  else{
    toast.error('Error in deleting calorie intake')
  }
})
.catch((err) => {
  toast.error("Error in deleting ")
  console.log(err)
})
}
 
React.useEffect(()=>{
  getCalorieIntake()
},[date])         //get the full calorie intake on that day
 
const selectedDay = (val:any) => {
  setDate(val)
};          //funtion to set the data on whatever being clicked on 
 

  return (
    <div className='popupout'>
        <div className='popupbox'>
          <button className='close'
           onClick={()=>{
            setShowCalorieIntakePopup(false)
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
           label='food item name'
           variant='outlined'
           color='warning'
           onChange={(e)=>{
            setCalorieIntake({ ...calorieIntake,item:e.target.value})
           }} />

        <TextField id="outlined-basic"
           label='food quantity in gm'
           variant='outlined'
           color='warning'
           type='number'
           onChange={(e)=>{
            setCalorieIntake({ ...calorieIntake,quantity:e.target.value})
           }} />

           <LocalizationProvider dateAdapter={AdapterDayjs}>
           <TimePicker label='Time Picker' value={time} onChange={(newValue)=>{
           setTime(newValue)}} />
         </LocalizationProvider>
         <Button variant='contained'
         color='warning'
         onClick={saveCalorieIntake}>
            Save
         </Button>
         <div className='hrline'></div>
         <div className='items'>
          {
            items.map((item:any) => {
              return (
                <div  className='item'>
                  <h3>{item.item}</h3>
                  <h3>{item.quantity} {item.quantitytype}</h3>
                  <button
                  onClick={
                    () => {
                      deleteCalorieIntake(item);
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
}

export default CalorieIntakePopup
