import React from 'react';
import '../popup.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AiFillDelete, AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface WeightPopupProps {
  setShowWeightPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const WeightPopup: React.FC<WeightPopupProps> = ({ setShowWeightPopup }) => {
  const [date, setDate] = React.useState(dayjs(new Date()));
  const [weightInKg, setWeightInKg] = React.useState<string>('');

  const [items, setItems] = React.useState<any>([]); // previously stored weight data

  const saveWeightEntry = async () => {
    console.log('Weight entry date:', date);
    console.log('Weight in kg:', weightInKg);

    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/weighttrack/addweightentry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        date: date.format('YYYY-MM-DD'),
        weightInKg: parseFloat(weightInKg)
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          toast.success('Weight entry added successfully');
          getWeight();
          window.location.reload();
        } else {
          toast.error('Error in adding weight entry');
        }
      })
      .catch((err) => {
        toast.error('Error in adding weight entry');
        console.log(err);
      });
  };

  const getWeight = async () => {
    setItems([]); // hook initialized as empty
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/weighttrack/getweightbydate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        date: date
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          console.log(data.data, 'Weight data for date');
          setItems(data.data);
        } else {
          toast.error('Error in getting weight data');
        }
      })
      .catch((err) => {
        toast.error('Error in getting weight data');
        console.log(err);
      });
  };

  const deleteWeightData = async (item: any) => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/weighttrack/deleteweightentry', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        date: item.date
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          console.log('Weight data deleted');
          toast.success('Weight data deleted');
          getWeight();
        } else {
          toast.error('Error in deleting weight data');
        }
      })
      .catch((err) => {
        toast.error('Error in deleting weight data');
        console.log(err);
      });
  };

  React.useEffect(() => {
    getWeight();
  }, [date]);

  const selectedDay = (val: any) => {
    setDate(val);
  };

  return (
    <div className='popupout'>
      <div className='popupbox'>
        <button className='close'
          onClick={() => {
            setShowWeightPopup(false);
          }}>
          <AiOutlineClose />
        </button>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Date"
            value={date}
            onChange={(newValue: any) => {
              selectedDay(newValue);
            }} />
        </LocalizationProvider>
        <TextField
          id="outlined-basic"
          label='Weight in kg'
          variant='outlined'
          color='warning'
          type="number"
          onChange={(e) => {
            setWeightInKg(e.target.value);
          }} />

        <Button variant='contained'
          color='warning'
          onClick={saveWeightEntry}>
          Save
        </Button>
        <div className='hrline'></div>
        <div className='items'>
          {
            items.map((item: any) => {
              return (
                <div className='item'>
                  <h3>{item.date}</h3>
                  <h3>{item.weightInKg} kg</h3>
                  <button
                    onClick={() => {
                      deleteWeightData(item);
                    }}>
                    <AiFillDelete />
                  </button>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

export default WeightPopup;
