import React, { useEffect, useState } from 'react'
import Script from 'react-load-script';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from "@/components/ui/input"
import Options from "@/components/Options";
import { Button } from '../components/ui/button'
import { toast } from 'sonner';
import { AI_PROMPT } from "@/components/Options";
import { chatSession } from '../Aimodel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../firebaseconfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useNavigation } from 'react-router-dom';


const About = () => {
  const [place,setPlace] = useState();
  const [formData,setFormData] = useState([]);
  const [openDialog,setOpenDialog] = useState(false);
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const handleInputChange = (name,value) => {
    

    setFormData({
      ...formData,
      [name]: value
    })
  }
  useEffect(()=>{
    console.log(formData);
  },[formData])

  const login=useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfile(codeResp),
    onError:(error)=>console.log(error)
  })
  
  const OnGenerateTrip=async()=>{

    
    const user = localStorage.getItem('user');
    if (!user)

      {
        setOpenDialog(true)
        return;
      }

    
    if(formData?.noOfhrs>24&&!formData?.location ||!formData?.budget ){
      toast("Fill all the details")
      return ;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
    .replace('{location}', formData?.location.label)
    .replace('{noOfhrs}', formData?.noOfhrs)
    .replace('{budget}', formData?.budget)
    .replace('{Destination}', formData?.Destination)
    .replace('{Timeoftheday}', formData?.Timeoftheday)
    .replace('{Social}', formData?.Social)
    .replace('{Eating}', formData?.Eating)

    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text())
  }
  
  const  SaveAiTrip=async(TripData)=>{
    setLoading(true);
      const user=JSON.parse(localStorage.getItem('user'));
      const docId=Date.now().toString()
     // Add a new document in collection "cities"
      await setDoc(doc(db, "cities", docId), {
        userSelection:formData,
        tripData:JSON.parse(TripData),
        userEmail:user?.email,
        id:docId
      });
      setLoading(false);
      navigate('/view-trip/'+docId)
  }

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
      headers:{
        Authorization:`Bearer ${tokenInfo?.access_token}`,
        Accept:'Application/json'
     }}).then((resp)=>{
      console.log(resp);
      localStorage.setItem('user',JSON.stringify(resp.data));
      
      OnGenerateTrip();
     })
     
  }
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 bg-white mt-20'>
      <h2 className='font-bold text-blue-600 text-3xl'>Tell us your travel preferences</h2>
      <p className='mt-3 text-gray-500 text'>Uncover destinations that respect your personal space and love for quiet exploration. Your travel style is unique, Use our search filters to discover places and activities that fit your pace and preferences.
      </p>
      <div className='mt-10 flex-col gap-10'>
        <div>
          <h2 className='text-xl text-blue-800 my-3 font-medium'>What is your destination? </h2>
          <GooglePlacesAutocomplete
             apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
             selectProps={{
              place,
              onChange:(v) => {setPlace(v); handleInputChange('location',v)}

             }}
             
          />
          <div>
            <h2 className='text-xl my-3  text-blue-800 font-medium'>Number of hours</h2>
            <Input placeholder = {'Number of hours should be below 24'} type = "Number" 
              onChange={(e) => handleInputChange('noOfhrs',e.target.value)}
            />
          </div>

        </div>
        <div> 
          <h2 className='text-xl my-3  text-blue-800 font-medium'>Budget</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {Options.SelectBudgetList.map((item, index) =>(
              <div key = {index} 
                onClick={() => handleInputChange('budget',item.title)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
              ${formData?.budget == item.title&&'shadow-lg border-black'}`}>
                <h2 className='text-5xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
          
        </div>
        
        <div> 
          <h2 className='text-xl my-3  text-blue-800 font-medium'>Do you feel like eating?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {Options.Eating.map((item, index) =>(
              <div key = {index} 
                onClick={() => handleInputChange('Eating',item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                ${formData?.Eating == item.title&&'shadow-lg border-black'}`}>
                <h2 className='text-5xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
          
        </div>
        <div> 
          <h2 className='text-xl my-3  text-blue-800  font-medium'>Social Interaction Level</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {Options.SelectTravelList.map((item, index) =>(
              <div key = {index} 
                onClick={() => handleInputChange('Social',item.desc)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                  ${formData?.Social == item.desc&&'shadow-lg border-black'}`}>
                <h2 className='text-5xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>

          
          
        </div>
        <div> 
          <h2 className='text-xl my-3  text-blue-800 font-medium'>Destination Type </h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {Options.DestinationType.map((item, index) =>(
              <div key = {index} 
                onClick={() => handleInputChange('Destination',item.title )}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                  ${formData?.Destination == item.title&&'shadow-lg border-black'}`}>
                <h2 className='text-5xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
          
        </div>
        <div> 
          <h2 className='text-xl my-3  text-blue-800 font-medium'>Time of the day</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {Options.Timeofday.map((item, index) =>(
              <div key = {index} 
                onClick={() => handleInputChange('Timeoftheday',item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                  ${formData?.Timeoftheday == item.title&&'shadow-lg border-black'}`}>
                <h2 className='text-5xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
          
        </div>
        
      </div>
      <div className='my-10 justify-end flex'>
      <Button 
        disabled={loading}
      onClick={OnGenerateTrip}> 
        {loading?
        <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />:'generate trip'
        }
        
         </Button></div>
      <Dialog open={openDialog}>
      
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Sign In With Google</DialogTitle>
        <DialogDescription>
            
            <Button 
            
            onClick={login}
            className = 'w-full mt-5 flex gap-4 align-middle'>Sign In
            </Button>
        </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>

      
    </div>
  )
}

export default About
