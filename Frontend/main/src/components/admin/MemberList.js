import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import MemberEdit from './MemberEdit';
import AdminNavbar from './AdminNavbar';


export default function MemberList() {
    const [members, setMembers] = useState(["nimal"]);
    const [buttonPopup,setButtonPopup] = useState(false);
    const [id,setId]= useState();
    useEffect(() => {
        
    
        fetchData();
      }, []);

      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:8000/posts');
          if (response.ok) {
            const data = await response.json();
            setMembers(data);
          } else {
            console.error('Failed to fetch members:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching members:', error.message);
        }
      };

      const handleActionClick = (eid) => {
        setId(eid);
        setButtonPopup(true);
        
        // Perform your action here (Edit or Delete)
    
        
      };


      const deletemember=async(memid)=>{
        
            try {
                const response = await fetch(`http://localhost:8000/post/delete/${memid}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    fetchData();
                } else {
                    console.error('Failed to delete camera');
                }
            } catch (error) {
                console.error('Error deleting camera:', error);
            }
        };
      
  return (
    <div>
      <AdminNavbar/><br/><br/>
    <div className='container py-4 bg-body'>
    
    <h1>Members of Vanni Vogue</h1><br />
    <table className="members" >
      <thead>
        <tr className='headrow'>
          <th>No.</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
       {Array.isArray(members.existingPosts) ? (
          members.existingPosts.map((res, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{res.fname}</td>
              <td>{res.email}</td>
              <td>+94{res.phone}</td>
              <td>
                <Button className='btn btn-edit text-capitalize' value={res._id} onClick={e=>handleActionClick(e.target.value)}>Edit</Button>
                <Button className='btn btn-danger text-capitalize' value={res._id} onClick={e=>deletemember(e.target.value)}>Delete</Button>
              </td>
              
            </tr>
          ))
        ) : (
          
          <tr>
            <td colSpan="5">No members available</td>
          </tr>
        )}
      </tbody>
    </table>
    <MemberEdit trigger={buttonPopup} setTrigger={setButtonPopup} memberid={id}/>
  </div>
  </div>
  )
}
