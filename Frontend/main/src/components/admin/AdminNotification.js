import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import './styles.css'
import AdminNavbar from './AdminNavbar';

export default function AdminNotification() {
    const [members, setMembers] = useState([]);
    const [allMem,setAllMem] = useState([]);
    const [applyMem,setApplyMem] = useState([]);
    const [reservationMem,setReservationMem] = useState([]);
    const [equipments,setEquipments] = useState([]);
    const [formData, setFormData] = useState({
      regno: '',
      pass: '',
      linkedin: '',
      facebook: '',
      instagram: '',
      fname: '',
      lname: '',
      phone: '',
      email: '',
      approval: '',
    });

    const [applyFormData,setApplyFormData] = useState({
      userregno:'',
      event:'',
      roleapply:'',
      status:'',
      marks:'',

    });

    const [reserveFormData,setReserveFormData] = useState({
      itemid:'',
      userregno:'',
      date:'',
      purpose:'',
      status:'',
    })
    useEffect(() => {
        fetchData();
      }, []);

    const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:8000/posts');
          const applyMembers = await fetch('http://localhost:8000/applies');
          const reservation = await fetch('http://localhost:8000/reservations');
          const equipment = await fetch('http://localhost:8000/equipments');
          if (response.ok) {
            const data = await response.json();
            const applyData = await applyMembers.json();
            const reservationData = await reservation.json();
            const equipmentData = await equipment.json();

            setMembers(data.existingPosts.filter(member => !member.approval));
            setAllMem(data.existingPosts);
            setApplyMem(applyData.existingPosts.filter(apply => !apply.status));
            setReservationMem(reservationData.existingPosts.filter(reserve=> !reserve.status));
            setEquipments(equipmentData.existingPosts);

          } else {
            console.error('Failed to fetch members:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching members:', error.message);
        }
    };

    const handleApprove = async (event) => {
        try {
          const updatedFormData = { ...formData, ...event, approval: true };
          const response = await fetch(`http://localhost:8000/post/update/${event._id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updatedFormData),
          });
          if (response.ok) {
            console.log('Data updated successfully!');
            // Refetch data to update UI
            fetchData();
          } else {
            console.error('Failed to update data:', response.statusText);
          }
        } catch (error) {
          console.error('Error updating data:', error.message);
        }
    }

    const handleApproveReserve = async (event) => {
      try {
        const updatedFormData = { ...reserveFormData, ...event, status: true };
        const response = await fetch(`http://localhost:8000/reservation/update/${event._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedFormData),
        });
        if (response.ok) {
          console.log('Data updated successfully!');
          // Refetch data to update UI
          fetchData();
        } else {
          console.error('Failed to update data:', response.statusText);
        }
      } catch (error) {
        console.error('Error updating data:', error.message);
      }
  }

  const handleApproveApply = async (event) => {
    try {
      const updatedFormData = { ...applyFormData, ...event, status: true };
      const response = await fetch(`http://localhost:8000/apply/update/${event._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedFormData),
      });
      if (response.ok) {
        console.log('Data updated successfully!');
        // Refetch data to update UI
        fetchData();
      } else {
        console.error('Failed to update data:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating data:', error.message);
    }
}

const handleDeleteMember = async (memId) => {
  try {
      const response = await fetch(`http://localhost:8000/post/delete/${memId}`, {
          method: 'DELETE',
      });
      if (response.ok) {
          fetchData();
      } else {
          console.error('Failed to delete Reservation');
      }
  } catch (error) {
      console.error('Error deleting reservation:', error);
  }
};

const handleDeleteApply = async (applyId) => {
  try {
      const response = await fetch(`http://localhost:8000/apply/delete/${applyId}`, {
          method: 'DELETE',
      });
      if (response.ok) {
          fetchData();
      } else {
          console.error('Failed to delete Reservation');
      }
  } catch (error) {
      console.error('Error deleting reservation:', error);
  }
};

  const handleDeleteReserve = async (reserveId) => {
    try {
        const response = await fetch(`http://localhost:8000/reservation/delete/${reserveId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            fetchData();
        } else {
            console.error('Failed to delete Reservation');
        }
    } catch (error) {
        console.error('Error deleting reservation:', error);
    }
  };

  const isLoggedIn = !!localStorage.getItem('username');
  const isLoggedInRole = !!localStorage.getItem('role');
  if (!isLoggedIn || !isLoggedInRole) {
      
      return (
          <div style={styles.restrict}>
              <h2><b><i class="bi bi-exclamation-octagon"></i> Restriction!</b></h2>
              <h3>Please log in to access this page - <a href='/'>Click Here To Visit Login...</a> </h3>
          </div>
      );
  }
    return (
      <div>
        <AdminNavbar/><br/><br/>
      <div className='container py-4 bg-body'>

          <h2>Registration Approval</h2>
          <div className="container py-4 bg-body">
              
              <div className="row">
                  <Accordion defaultActiveKey={['0']} alwaysOpen>
                  {Array.isArray(members) && members.length > 0 ? (
                      members.map((event, index) => (
                          <Accordion.Item key={index} eventKey={index.toString()}>
                              <Accordion.Header style={{ fontSize: '20px' }}>{event.regno}</Accordion.Header>
                              <Accordion.Body>
                                  Name: {event.fname} {event.lname}<br />
                                  Phone No: {event.phone}<br />
                                  email: {event.email}<br />
                                  Linkedin Link: {event.linkedin}<br />
                                  Facebook Link: {event.facebook}<br />
                                  Instagram Link: {event.instagram}<br />
                                  Role: {event.role}<br/>
                                  <button className='btn btn-primary btn-approve text-capitalize' onClick={() => handleApprove(event)}>Approve</button>
                                  <button className='btn btn-danger text-capitalize btn-red' onClick={() => handleDeleteMember(event._id)}>Reject</button>
                              </Accordion.Body>
                          </Accordion.Item>
                      ))
                  ) : <p>No any non-approval members found.</p>
                  }
                  </Accordion>
              </div>
              
          </div>
          <h2>Event  Approval</h2><Accordion.Item>
          <Accordion.Body>
          
          <div className="container py-4 bg-body">
              
              <div className="row">
                  <Accordion defaultActiveKey={['0']} alwaysOpen>
                  {Array.isArray(applyMem) && applyMem.length > 0 ? (
                      applyMem.map((event, index) => (
                          <Accordion.Item key={index} eventKey={index.toString()}>
                              <Accordion.Header style={{ fontSize: '20px' }}>{event.userregno} : {event.roleapply}</Accordion.Header>
                              <Accordion.Body>
                                  
                                  {Array.isArray(allMem) && allMem.length > 0 ? (
                      allMem.map((mem, index) => {
                                  
                        if(mem.regno===event.userregno){
                          return(
                            <div key={index}>
                                Name : {mem.fname} {mem.lname}<br/>
                                Phone : {mem.phone}
                            </div>
                          
                          );
                        }
                          
                      })
                                  ):""}
                                  event: <b>{event.event}</b><br/>
                                  <button className='btn btn-primary btn-approve text-capitalize' onClick={() => handleApproveApply(event)}>Approve</button>
                                  <button className='btn btn-danger text-capitalize btn-red' onClick={() => handleDeleteApply(event._id)}>Reject</button>
                              </Accordion.Body>
                          </Accordion.Item>
                      ))
                  ) : <p>No any event applicant found.</p>
                  }
                  </Accordion>
              </div>
              
          </div>
          </Accordion.Body>
          </Accordion.Item>
          <h2>Equipments Approval</h2>
          <div className="container py-4 bg-body">
              
              <div className="row">
                  <Accordion defaultActiveKey={['0']} alwaysOpen>
                  {Array.isArray(reservationMem) && reservationMem.length > 0 ? (
                      reservationMem.map((event, index) => (
                          <Accordion.Item key={index} eventKey={index.toString()}>
                              <Accordion.Header style={{ fontSize: '20px' }}>{event.userregno} : {event.date}</Accordion.Header>
                              <Accordion.Body>
                              {Array.isArray(allMem) && allMem.length > 0 ? (
                      allMem.map((mem, index) => {
                                  
                        if(mem.regno===event.userregno ){
                          return(
                            <div key={index}>
                                Name : {mem.fname} {mem.lname}<br/>
                                Phone : {mem.phone}<br/>
                                Email : {mem.email}<br/>
                                Item:
                            </div>
                          
                          );
                        }
                          
                      })
                                  ):""}

                        <ul>
                                  {Array.isArray(equipments) && equipments.length > 0 ? (
                      equipments.map((equ, indexeq) => {
                       for(let i=0;i<event.itemid.length;i++){
                        if(equ._id===event.itemid[i]){
                          return(
                            <li>
                                 {equ.name} {equ.brand} {equ.itemtype} <br/>
                                
                            </li>
                          
                          );
                        }
                      }
                      
                          
                      })
                                  ):""}
                        </ul>
                        Purpose: {event.purpose}<br/>
                                  <button className='btn btn-primary btn-approve text-capitalize' onClick={() => handleApproveReserve(event)}>Approve</button>
                                  <button className='btn btn-danger text-capitalize btn-red' onClick={() => handleDeleteReserve(event._id)}>Reject</button>
                              </Accordion.Body>
                          </Accordion.Item>
                      ))
                  ) : <p>No any equipment requests found.</p>
                  }
                  </Accordion>
              </div>
              
          </div>
          <footer className="text-center fixed-bottom mb-3" id='footer'>
                  <p>&copy; Vanni Vogue Camera Club</p>
          </footer>
      </div>
      </div>
    )
}


const styles={
  restrict:{
  boxShadow: '2px 2px 10px 2px rgba(0, 0, 0, 0.582)',
  padding: '20px 10px',
  width: '90%',
  marginLeft: '5%',
  marginTop: '15%',
  backgroundColor: '#fff',
  height:'20vh',
  }
}