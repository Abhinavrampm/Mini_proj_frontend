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


interface WaterIntakeProps {
  setShowWaterPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const WaterPopup: React.FC<WaterIntakeProps> = ({ setShowWaterPopup }) => {
  const [date, setDate] = React.useState(dayjs(new Date()));
  const [time, setTime] = React.useState(dayjs(new Date()));
  const [waterIntake , setWaterIntake] = React.useState<any>({
    date:'',
    amountInMilliliters:''
 })

 const [items,setItems] = React.useState<any>([]) //previously stored sleep data


  const saveWaterEntry = async () => {
    

    let tempdate = date.format('YYYY-MM-DD')
    let temptime = time.format('HH:mm:ss')    //get time and merge it with the date when a food is eaten
    let tempdatetime = tempdate + ' ' + temptime //to merge date and time 
    let finaldatetime = new Date(tempdatetime) //convert this to date object

    console.log(finaldatetime)

    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/watertrack/addwaterentry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            
        },
        credentials: 'include',
        body: JSON.stringify({
          date:finaldatetime,
          amountInMilliliters : waterIntake.amountInMilliliters
        })
        
    })
      .then(res=>res.json())
      .then(data => {
        if(data.ok){
          toast.success('Water Data added successfully')
          getWater()  
          window.location.reload();  
        }
        else{
          toast.error('Error in adding water data')
        }
      })
      .catch((err) => {
        toast.error("Error in adding catch")
        console.log(err)
      })
    };

    const getWater = async() =>{
        setItems([])        //hook initialized as empty
        fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/watertrack/getwaterbydate', {
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
         console.log(data.data,'Water intake data for date')
          setItems(data.data)  
        }
        else{
          toast.error('Error in adding Water Intake')
        }
      })
      .catch((err) => {
        toast.error("Error in adding catch")
        console.log(err)
      })
 }
 const deleteWaterEntry = async(item:any) =>{
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/watertrack/deletewaterentry', {
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
     console.log('Water data deleted')
     toast.success('Water intake data deleted')
      getWater();
    }
    else{
      toast.error('Error in deleting water data')
    }
  })
  .catch((err) => {
    toast.error("Error in deleting ")
    console.log(err)
  })
  }
   
  React.useEffect(()=>{
    getWater()
  },[date])         
   
  const selectedDay = (val:any) => {
    setDate(val)
  };  

  

  return (
    <div className='popupout'>
      <div className='popupbox'>
       <button className='close'
       onClick={()=>{
        setShowWaterPopup(false)
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
       label='amount in milli litres'
       variant='outlined'
       color='warning'
       onChange={(e)=>{
        setWaterIntake({ ...waterIntake,amountInMilliliters:e.target.value})
       }} />

     <Button variant='contained'
     color='warning'
     onClick={saveWaterEntry}>
        Save
     </Button>
     <div className='hrline'></div>
     <div className='items'>
      {
        items.map((item:any) => {
          return (
            <div  className='item'>
              <h3>{item.date}</h3>
              <h3>{item.amountInMilliliters} </h3>
              <button
              onClick={
                () => {
                  deleteWaterEntry(item);
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


export default WaterPopup;