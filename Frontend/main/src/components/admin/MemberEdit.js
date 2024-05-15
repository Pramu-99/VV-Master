import React, { useState, useEffect } from 'react';
import './styles.css';

export default function MemberEdit(props) {
  

  return props.trigger ? (
    <div style={styles.popup}>
      <div style={styles.popupinner}>
        <button style={styles.closebtn} onClick={() => props.setTrigger(false)}>Close</button>
        
        <form className='editForm' onSubmit={handleSubmit}>
          <label>
            Name :
          </label>
          <input
            type='text'
            placeholder='First Name'
            name='fname'
            onChange={handleChange}
            value={formData.fname}
          />
          <input
            type='text'
            placeholder='Last Name'
            name='lname'
            onChange={handleChange}
            value={formData.lname}
          />
          <br />
          <label>Phone :</label>
          <input
            type='text'
            placeholder='Phone Number'
            name='phone'
            onChange={handleChange}
            value={formData.phone}
          />
          <br />
          <label>Email :</label>
          <input
            type='email'
            placeholder='Email'
            name='email'
            onChange={handleChange}
            value={formData.email}
          />
          <br />
          <label>Linkedin :</label>
          <input
            type='text'
            placeholder='LinkedIn Link'
            name='linkedin'
            onChange={handleChange}
            value={formData.linkedin}
          />
          <br />
          <label>Facebook :</label>
          <input
            type='text'
            placeholder='Facebook Link'
            name='facebook'
            onChange={handleChange}
            value={formData.facebook}
          />
          <br/>
          <label>Instagram :</label>
          <input
            type='text'
            placeholder='Instagram Link'
            name='instagram'
            onChange={handleChange}
            value={formData.instagram}
          />
          <br />
          <label>Role : </label>
          <select name='role' value={formData.role} onChange={handleChange}>
            <option>member</option>
            <option>admin</option>
          </select><br/><br/>
          <button className='submit' value={props.memberid} onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  ) : null;
}

const styles = {
  popup: {
    position: "fixed",
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.2)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  popupinner: {
    position: 'relative',
    padding: '32px',
    width: '100%',
    maxWidth: '640px',
    backgroundColor: '#fff',
    overflow: 'scroll',
    height: '60vh',
  },
  closebtn: {
    position: 'sticky',
    float: 'right',
    top: '0px',
    right: '16px',
    padding: '5px 10px',
  },
};
