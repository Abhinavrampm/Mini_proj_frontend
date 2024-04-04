import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import './HomeBanner2.css'
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { toast } from 'react-toastify';

const HomeBanner2 = () => {
  const [ data , setData ] = React.useState<any[]>([]);
  const getData = async() => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API+'/workoutplans/workouts',{
        method:'GET',
        credentials:'include',
        headers:{
            'Content-Type':'application/json'
        },
      });
      const jsonData = await response.json();
      console.log(jsonData)
      if(jsonData.ok){
          setData(jsonData.data)
          
        }
        else{
          setData([])
          toast.error("Unable to fetch data")
        }
  
      } catch (err) {
        console.log(err)
        setData([])
      }
  }
  React.useEffect(() => {
    getData()
  },[]);

  return (
   <>
    {
      data.length > 0 && 
      <div>
      <h1 className='mainhead1'>Workouts</h1>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {
           data.map((item,index) => {
            if(item.imageURL){
            return(
              <SwiperSlide key={index}>
                <div className='swiper-slide'
                style={
                  {
                    backgroundImage:`url(${item.imageURL})`
                  }
                }
                onClick={() =>{
                  window.location.href = `/workouts?id=${item._id}`
                }}
                >
                  <div className='swiper-slide-content'>
                    <h2>{item.name}</h2>
                    <p>{item.durationInMinutes} min</p>
                  </div>
                </div>
              </SwiperSlide>
            )
              }
          })

        }
      </Swiper>
    </div>
    }
   </> 
  )
}

export default HomeBanner2