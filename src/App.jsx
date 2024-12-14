
import { Route , BrowserRouter as Router, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import { Home,About,Projects,Contact } from './pages';
import {Button} from './components/ui/button'
import Viewtrip from './view-trip/[tripId]/Viewtrip';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
const App = () => {
  

  return (
    
    <main className='bg-slate-300/20'>
      
      <Router>
        <Navbar/>
        <Routes>
          <Route path = '/' element = {<Home/>}/>
          <Route path = '/about' element = {<About/>}/>
          <Route path = '/projects' element = {<Projects/>}/>
          <Route path = '/contact' element = {<Contact/>}/>
          <Route path = '/view-trip/:tripId' element = {<Viewtrip/>}/>
          
        </Routes>
      </Router>

    </main>
   
  )
}

export default App
