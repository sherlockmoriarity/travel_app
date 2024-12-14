import React, { useEffect, useState } from 'react'




//const PHOTO_REF_URL='https://places.googleapis.com/v3/trip?.userSelection?.location?.label/media?maxHeightPx=1000&maxWidthPx=1000&key='+import.meta.env.VITE_GOOGLE_API_KEY

function Info({trip})  {
   
    
  return (
    <div >
        

        <div className='my-5 flex-col gap-2 '>
           <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
           <div className='flex gap-2'>
              <h2 className='p-1 px-3 bg-blue-200 rounded-full text-gray-950 text-xs md:text-md'>{trip?.userSelection?.noOfhrs} Hours</h2>
              <h2 className='p-1 px-3 bg-blue-200 rounded-full text-gray-950 text-xs md:text-md'>{trip?.userSelection?.budget} Budget</h2>
              <h2 className='p-1 px-3 bg-blue-200 rounded-full text-gray-950 text-xs md:text-md'>{trip?.userSelection?.Eating} </h2>
              <h2 className='p-1 px-3 bg-blue-200 rounded-full text-gray-950 text-xs md:text-md'>{trip?.userSelection?.Social} </h2>
              <h2 className='p-1 px-3 bg-blue-200 rounded-full text-gray-950 text-xs md:text-md'>{trip?.userSelection?.Destination} </h2>
              <h2 className='p-1 px-3 bg-blue-200 rounded-full text-gray-950 text-xs md:text-md'>{trip?.userSelection?.Timeoftheday} </h2>
           </div>
        </div>
    </div>
  )
}

export default Info