import React, { useEffect, useState } from 'react';
import '../css/Camera_reserve1.css';
import { CameraList } from "./CameraList";
import CameraItem from "./CameraItem";
import vanni from "../img/unsplash_oQl0eVYd_n8.png";
import axios from 'axios';
import CommonNav from './CommonNav';
import UserNavbar from './UserNavbar';
export default function Camera_reserve(){

  const Swal = require('sweetalert2');

  const [equipment, setEquipment] = useState(["nimal"]);
  const [selectedItems, setSelectedItems] = useState([]);

  const memRegNo=localStorage.getItem('username');
  localStorage.setItem('username', memRegNo);
  console.log(memRegNo);

  const [formData, setFormData] = useState({
    itemid:'',
    userregno:memRegNo,
    date:'',
    purpose:'',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        console.log(formData.itemid);
        const response = await axios.get('http://localhost:8000/equipments');
        console.log('API Response:', response.data);
        setEquipment(response.data);
        
      } catch (error) {
        console.error('Error fetching members:', error.message);
      }
    };

    fetchData();
    console.log(equipment.status);
  }, []);

  const handleCheckboxes=(event)=>{
    
    setSelectedItems(prevSelected => {
      if(event.target.checked==true){
      
        
        return [...prevSelected, event.target.value];
      
    }else{
      if (prevSelected.includes(event.target.value)) {
        return prevSelected.pop(event.target.value) ; 
      }
    }
    });

     console.log(selectedItems);
    console.log(event.target.checked);
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    console.log(formData.itemid);
    console.log(formData.date);
   
  };

  const handleConfirm=()=>{
    console.log(selectedItems);
    setFormData({...formData,"itemid":selectedItems});
    console.log(formData.itemid);
    console.log(formData.itemid[1]);
    console.log(selectedItems);
    console.log(formData.date);
    console.log(formData.purpose);
    if(formData.itemid[1]!=undefined){
      savePostToMongo();
    }
    
  }

  const savePostToMongo = async () => {
    try {
      
      await axios.post('http://localhost:8000/reservation/save', formData);
      Swal.fire({
        title: 'Reservation Successfully',
        text: 'Thank you for Reviewing',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      setFormData({
        itemid:'',
        userregno:memRegNo,
        date:'',
        purpose:'',
      });
      
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Please check your internet Connection',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      console.error('Error saving post:', error.message);
    }
  };

  return(
    <div>
      <UserNavbar/>
  <div className="reserve">

    <h1 className="reservetitle">Reservation</h1>
    <div className="list">
        {Array.isArray(equipment.existingPosts) ? (
        equipment.existingPosts.map((item,key )=>{
            return (<CameraItem
            image={vanni} 
            des={item.details}
            camname={item.name}
            item={item.itemtype}
            brand={item.brand}
            itemid={item._id}
            onCheckboxChange={handleCheckboxes}
              />
            );
        })
        ):(
          <p>error</p>
        )
      
      }
        
    </div>
   
    <h1 style={{  fontSize: '40px',backgroundColor:'white',textAlign:'left',margin:'20px',  fontFamily: 'cursive'}} >Calender</h1>
    <input  className='date' type="date" name='date' value={formData.date} onChange={handleChange}/><br/>
    <h1 style={{  fontSize: '40px',backgroundColor:'white',textAlign:'left',margin:'20px',  fontFamily: 'cursive'}} >Purpose</h1>
    <textarea
        placeholder="Mention Purpose Here" name="purpose"
        style={Object.assign({}, styles.textarea, styles.boxBack)}
        onChange={handleChange}
        value={formData.purpose}
      />
    <input  type='button'  className="confirm" value='confirm' onClick={handleConfirm}/>
    
    </div> 
  </div>
);
}
