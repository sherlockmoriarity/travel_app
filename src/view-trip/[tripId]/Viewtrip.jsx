import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../firebaseconfig';
import { toast } from 'sonner';
import Info from './Components/Info';
import Placestovisit from './Components/Placestovisit';
import Restaurants from './Components/Restaurants';

function Viewtrip() {
    const{tripId}=useParams();
    const [trip,setTrip]=useState([]);
    useEffect(()=>{
        tripId&&GetTripData();

    },[tripId])
    const GetTripData=async()=>{
        const docRef=doc(db,'cities',tripId);
        const docSnap=await getDoc(docRef);

        if(docSnap.exists()){
            console.log('Document:',docSnap.data());
            setTrip(docSnap.data());
        }
        else{
            console.log('no');
            toast('No trip found')
        }
    }

  return (
    <div className='p-20 md:px-10 lg:px-44 xl:px-56 bg-white'>
      <Info trip={trip}/>
      <Placestovisit trip={trip}/>
      <Restaurants trip={trip}/>
    </div>
  )
}

export default Viewtrip
