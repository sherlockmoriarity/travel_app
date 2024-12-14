import React from 'react'
import { Link } from 'react-router-dom'

function Placestovisit({trip}) {
  return (
    <div>
        <h2 className='font-bold text-xl mt-5'>Places to visit</h2>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {trip?.tripData?.TravelPlan?.Places?.map((Places,index)=>(
                <Link to ={'https://www.google.com/maps/search/?api=1&query='+Places?.PlaceName +","+Places?.PlaceAddress}>
                <div className='hover:scale-110 transition-all'>
                    
                    <div className='my-3'>
                        <h2 className='font-medium'>{Places?.PlaceName}</h2>
                        <h2 className='text-gray-700 text-lg'>{Places?.PlaceAddress}</h2>
                        <h2 className='text-gray-500 text-xs'>{Places?.Price}</h2>
                        <h2 className='text-gray-500 text-xs'>{Places?.Rating}</h2>
                        <h2 className='text-gray-500 text-xs'>{Places?.Description}</h2>
                    </div>
                </div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Placestovisit