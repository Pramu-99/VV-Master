import React from "react";
import '../css/Camera_reserve1.css';
import { CameraList } from "./CameraList";
import CameraItem from "./CameraItem";
export default function Camera_reserve(){
    return(
  <div className="reserve">
    <h1 className="reservetitle">Camera</h1>
    <div className="list">
        {CameraList .map((item,key )=>{
            return (<CameraItem
            image={item.image} 
            no={item.no}
            frame={item.frame}
            size={item.size}
            brand={item.brand}
            
              />
            );
        })}
        
    </div>
   
    <h1 style={{  fontSize: '40px',backgroundColor:'white',textAlign:'left',margin:'20px',  fontFamily: 'cursive'}} >Calender</h1>
    <input  className='date' type="date"/><br/>
    <input  type='submit'  className="confirm" value='confirm'/>
    
    
  </div>
);
}