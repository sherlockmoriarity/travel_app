
import { NavLink, useNavigation } from 'react-router-dom'
import { Button } from './ui/button'
import { useEffect } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const Navbar = () => {
  const user=JSON.parse(localStorage.getItem('user'));
  const [openDialog,setOpenDialog] = useState(false);
  

  useEffect(()=>{
   console.log(user)
  },[])
  const login=useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfile(codeResp),
    onError:(error)=>console.log(error)
  })
  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
      headers:{
        Authorization:`Bearer ${tokenInfo?.access_token}`,
        Accept:'Application/json'
     }}).then((resp)=>{
      console.log(resp);
      localStorage.setItem('user',JSON.stringify(resp.data));
      
      window.location.reload();
     })
     
  }
  return (
    <header className='header'>
       <NavLink to="/" className="w-40 h-10 rounded-lg bg-white items-center justify-center flex font-bold  shadow-lg">
          <p className='blue-gradient_text'>@solodaytrip</p>
       </NavLink>
       <nav className='flex text-lg gap-7 font-medium'>
          <NavLink to = "/about" className={({isActive}) => isActive? "text-blue-500": "text-black"} >
           Travel
          </NavLink>
          <NavLink to = "/projects" className={({isActive}) => isActive? "text-blue-500": "text-black"} >
           View trip
          </NavLink>
          <div>
            {user?
              <div className='flex items-center gap-3'>
                <Button>Logged In</Button>
                
                <Popover>
                  <PopoverTrigger>
                  <img src={user?.picture} className='h-[35px] w-[35px] rounded-full'/>
                  </PopoverTrigger>
                  <PopoverContent>
                    <h2 className='cursor-pointer' onClick={()=> {
                      googleLogout();
                      localStorage.clear();
                      window.location.reload();
                    }}>Logout</h2>
                  </PopoverContent>
                </Popover>

              </div>
              :
              <Button onClick={()=> setOpenDialog(true)}>Sign In</Button>
            }
          </div>
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
       </nav>
    </header>
  )
}

export default Navbar
