import { Link } from "react-router-dom";
import React from "react";


const InfoBox = ({text,link,btnText}) => (
    <div className="info-box" style={{ width: '100%', maxWidth: '800px' }}>
       <p className="font-medium">{text}</p>
       <Link to = {'/about'} className="neo-brutalism-white neo-btn">
       {btnText}
       </Link>
    </div>
)

const renderContent = {
    1:(
        <InfoBox 
          text ="                 Discover your day, your way. Plan the perfect day with your personal travel companion."
          link = '/about'
          btnText= "Travel Now"
        />
        
    )
}


const HomeInfo = ({ currentStage, }) => {
  return renderContent[currentStage]|| null;
    
      
   
};

export default HomeInfo;