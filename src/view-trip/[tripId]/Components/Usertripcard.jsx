import React from 'react'
import { Projects } from '@/pages'
function Usertripcard({trip}) {
  return (
    <div>
        <img className='object-cover rounded-xl'/>
        <div>
            <h2 className='font-bold text-lg'>{trip?.userSelection?.location.label}</h2>
            <h2 className='text-sm text-gray-500 '>Budget:{trip?.userSelection?.budget}</h2>
            <h2 className='text-sm text-gray-500 '>Hours:{trip?.userSelection?.noOfhrs}</h2>
            <h2 className='text-sm text-gray-500 '>Food:{trip?.userSelection?.Eating}</h2>
        </div>

    </div >
  )
}

export default Usertripcard