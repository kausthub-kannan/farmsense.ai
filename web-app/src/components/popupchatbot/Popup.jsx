import React from 'react'
import { MdClose } from 'react-icons/md';
import './Popup.css'
function Popup(props) {
  return (props.trigger)?(

    <div className='popup'>
      <div className="popup-inner h-[500px]">
        <span  className='close-btn ' onClick={()=>{props.setTrigger(false)}} ><MdClose/></span>
        {props.children}
       
      </div>
    </div>
    
  ):""
}

export default Popup