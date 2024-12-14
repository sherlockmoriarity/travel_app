import { query , where} from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate, useNavigation } from 'react-router-dom';
import { db } from '../firebaseconfig';
import { collection, getDocs } from "firebase/firestore";
import Usertripcard from '@/view-trip/[tripId]/Components/Usertripcard';


function Projects ()  {

  
    const Navigation=useNavigate();
    const [userTrips,setUserTrips]=useState([]);
    useEffect(()=>{
       GetUserTrips();
    },[])
    /**
     * @returns
     */
  const GetUserTrips=async()=>{  
    
    const user=JSON.parse(localStorage.getItem('user'));
    console.log(user)
    if(!user){
       Navigation('/')
       return;
    }
    setUserTrips([]);
    const q=query(collection(db,'cities'),where('userEmail','==',user?.email))
    const querySnapshot = await getDocs(collection(db, "cities"));
    querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
       console.log(doc.id, " => ", doc.data());
       setUserTrips(prevVal =>[...prevVal,doc.data()])
});
  }
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 bg-white mt-20 '>
     <h2 className='font-bold text-3xl'>My recents</h2>
     <div className='grid grid-cols-2 mt-10 md:grid-cols-3 gap-5'>
      {userTrips.map((trip,index)=>(
        <Usertripcard trip={trip} />
      ))}
     </div>
    </div>
  )
}


export default Projects
