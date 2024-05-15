import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/logindetails.css';
import { Link, useNavigate } from 'react-router-dom';

export default function UserLoginDetails() {
  useEffect(() => {
    fetchData();
  }, []);

  const Swal = require('sweetalert2');
  const navigate = useNavigate();
  const storeRegno = localStorage.getItem('username');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isDropdownVisibleNotifi, setIsDropdownVisibleNotifi] = useState(false);
  const [formData, setFormData] = useState([]);
  const [equipments, setEquipment] = useState([]);
  const [applyPosition, setApplyPosition] = useState([]);

  const showDropdown = () => {
    setIsDropdownVisible(true);
  };

  const hideDropdown = () => {
    setIsDropdownVisible(false);
  };

  const showDropdownNotification = () => {
    setIsDropdownVisibleNotifi(true);
  };

  const hideDropdownNotification = () => {
    setIsDropdownVisibleNotifi(false);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/reservations');
      const equ = await axios.get('http://localhost:8000/equipments');
      const applyeve = await axios.get('http://localhost:8000/applies');
      console.log('API Response:', response.data);
      setFormData(response.data.existingPosts.filter(mem => mem.userregno === storeRegno));
      setEquipment(equ.data.existingPosts);
      setApplyPosition(applyeve.data.existingPosts.filter(apply => apply.userregno === storeRegno));
      console.log(applyPosition);
    } catch (error) {
      console.error('Error fetching members:', error.message);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  
  return (
    <div>
      <div className='logdetails'>
        <i className="bi bi-person-circle logdetails-icon"></i>{storeRegno}
        <i className="bi bi-caret-down-fill logdetails-icon" onMouseEnter={showDropdown}></i>
        <i className="bi bi-bell-fill logdetails-icon" onMouseEnter={showDropdownNotification}></i>
      </div>
      {isDropdownVisible && (
        <div className='logdetails-dropdown' onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
          <div className='logdetails-compo'><i className="bi bi-person-lines-fill"></i> Profile</div>
          <div className='logdetails-compo' onClick={handleSignout}><i className="bi bi-box-arrow-right"></i> Signup</div>
        </div>
      )}
      {isDropdownVisibleNotifi && (
  <div className='logdetails-notificationPanel' onMouseEnter={showDropdownNotification} onMouseLeave={hideDropdownNotification}>
    <b>Equipments Requests</b>
    {Array.isArray(formData) && formData.length > 0 ? (
      formData.filter(event => !isBookingExpired(event.date)).length > 0 ? (
        formData.map((event, index) => (
          !isBookingExpired(event.date) && (
            <div className='logdetails-notification' key={index}>
              Items:
              <ul>
                {Array.isArray(equipments) && equipments.length > 0 ? (
                  equipments.map((equ, indexeq) => {
                    for (let i = 0; i < event.itemid.length; i++) {
                      if (equ._id === event.itemid[i]) {
                        return (
                          <li key={indexeq}>
                            {equ.name} {equ.brand} {equ.itemtype} <br />
                          </li>
                        );
                      }
                    }
                  })
                ) : ""}
              </ul>
              Purpose: {event.purpose}<br />
              Booking Date: {formatDate(event.date)} <br />
              Status: {event.status ? "Accept" : "Pending..."} <br />
            </div>
          )
        ))
      ) : (
        <div className='logdetails-notification'>No any Request yet</div>
      )
    ) : (
      <div className='logdetails-notification'>No any Request yet</div>
    )}

    <b>Role Apply</b>
    {Array.isArray(applyPosition) && applyPosition.length > 0 ? (
      applyPosition.map((event, index) =>( 
      !isBookingExpired(event.markeddate) && (
        <div className='logdetails-notification' key={index}>
          event: {event.event}<br />
          role: {event.roleapply} <br />
          Status: {event.status ? "Accept" : "Pending..."} <br />
          Marked Date: {event.markeddate ? formatDate(event.markeddate) : "Pending..."}<br/>
          {event.marks ? "Marks: "+event.marks+"%" : ""}
        </div>
      )
      ))
    ) : (
      <p>No any applies yet</p>
    )}
  </div>
)}

    </div>
  );
}
