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
