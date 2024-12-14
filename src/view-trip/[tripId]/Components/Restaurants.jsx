import React from 'react'
import { Link } from 'react-router-dom'

function Restaurants({trip}) {
  return (
    <div>
        <h2 className='font-bold text-xl mt-5'>Restaurants</h2>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {trip?.tripData?.TravelPlan?.Restaurants?.map((Restaurants,index)=>(
                <Link to ={'https://www.google.com/maps/search/?api=1&query='+Restaurants?.RestaurantName +","+Restaurants?.RestaurantAddress}>
                <div className='hover:scale-110 transition-all'>
                    
                    <div className='my-3'>
                        <h2 className='font-medium'>{Restaurants?.RestaurantName}</h2>
                        <h2 className='text-gray-700 text-lg'>{Restaurants?.RestaurantAddress}</h2>
                        <h2 className='text-gray-500 text-xs'>{Restaurants?.Price}</h2>
                        <h2 className='text-gray-500 text-xs'>{Restaurants?.Rating}</h2>
                        <h2 className='text-gray-500 text-xs'>{Restaurants?.Description}</h2>
                    </div>
                </div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Restaurants