import {Suspense, useState} from 'react'
import {Canvas} from '@react-three/fiber'
import Loader from '../components/Loader'
import Island from '../models/Island'
import Sky from '../models/Sky'

import HomeInfo from '../components/HomeInfo'


const Home = () => {
  const [currentStage, setCurrentStage] = useState(1)
  const [isRotating, setIsRotating] = useState(false);
  const adjustIslandForScreenSize = () => {
    let screenScale= null;
    let screenPosition = [0,1,-7];
    let rotation = [0.1,3.7,0];

    if(window.innerWidth < 768) {
      screenScale = [0.9,0.9,0.9];
      
    }else {
      screenScale = [1,1,1];

    }
    return [screenScale,screenPosition, rotation]
  }
  
  const [islandScale , IslandPosition,islandRotation ] = adjustIslandForScreenSize();
  
  return (
    <section className='w-full h-screen relative'>
      <div className='absolute bottom-28 left-0 right-0 z-10 flex items-center justify-center'>
          {currentStage && <HomeInfo  currentStage = {currentStage}/>}
      </div>

      <Canvas className={`w-full h-screen bg-transparent ${isRotating? 'cursor-grabbing':'cursor-grab'}`}
      camera = {{near:0.1, far:1000}}>
        <Suspense fallback= {<Loader/>}>
         <directionalLight position={[10,11,10]} intensity={5}/>
         <ambientLight intensity={0.5}/>
         <hemisphereLight skyColor = '#b1e1ff'groundColor={'#000000'} intensity={1}/>

         <Sky isRotating={isRotating}/>
         <Island
          position = {IslandPosition}
          scale = {islandScale}
          rotation = {islandRotation}
          isRotating = {isRotating}
          setIsRotating = {setIsRotating}
         />
         
        </Suspense>
      </Canvas>
    
    </section>
  );
};

export default Home;


