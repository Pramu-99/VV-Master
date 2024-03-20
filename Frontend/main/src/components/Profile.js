import React from 'react';

const Profile = ({ member }) => {
  // Mock rating for demonstration
  const rating = 4; // This rating should come from the database

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{ color: i <= rating ? 'gold' : 'gray' }}>
          &#9733;
        </span>
      );
    }
    return stars;
  };

  const styles = {
    container: {
      position: 'absolute',
      top: '100px',
      bottom: '20px',
      left: '110px',
      right: '110px',
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
      display: 'flex',
      flexDirection: 'column',
    },
    container1: {
      flex: '2',
      padding: '20px',
      position: 'relative',
    },
    memberBox: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      width: '125px',
      height: '125px',
      backgroundColor: member ? '#f0f4f7' : '#f5f5f5',
      border: '0px solid black',
    },
    memberDetails: {
      marginLeft: '82px',
    },
    memberDetailsList: {
      listStyleType: 'none',
      padding: '0',
      marginLeft: '82px',
    },
    table: {
      marginTop: '60px',
      borderCollapse: 'collapse',
      width: '72%',
      borderRadius: '10px',
      border: '1px solid black', // Ensure table always has a border
    },
    th: {
      border: '1px solid black',
      padding: '8px',
      textAlign: 'center',
    },
    td: {
      border: '1px solid black',
      padding: '8px',
      textAlign: 'center',
    },
    reviewBox: {
      backgroundColor: '#f5f5f5',
      borderRadius: '5px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
      padding: '5px',
      marginTop: '160px',
      marginBottom: '0px',
      display: 'flex',
      alignItems: 'center',
      width: '72%',
      height: '25%',
    },
    circle: {
      backgroundColor: '#ccc',
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      marginRight: '10px',
      marginBottom: '50px',
    },
    reviewContent: {
      flex: '1',
    },
    ratingStars: {
      color: 'gold',
    },
    messageLink: {
      color: 'black',
      cursor: 'pointer',
      marginLeft:'0px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.container1}>
        <span>
          {member ? (
            <div style={styles.memberBox}>
              {/* Content for box */}
            </div>
          ) : (
            <div style={styles.memberBox}></div>
          )}
          {member && (
            <div style={styles.memberDetails}>
              <ul style={styles.memberDetailsList}>
                <li><b>NAME: {member.name}</b></li>
                <li><b>VANNI VOGUE ID: {member.id}</b></li>
                <li><b>JOIN DATE: {member.joinDate}</b></li>
              </ul>
            </div>
          )}
          {!member && (
            <div style={styles.memberDetails}>
              <ul style={styles.memberDetailsList}>
                <li><b>NAME</b> </li>
                <li><b>VANNI VOGUE ID</b></li>
                <li><b>JOIN DATE</b></li>
              </ul>
            </div>
          )}
        </span>
  
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Events</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Marks</th>
            </tr>
          </thead>
        </table>
        <div style={styles.reviewBox}>
          <div style={styles.circle}></div>
          <div style={styles.reviewContent}>
          <b>
            <p>{member ? `MEMBER NAME: ${member.name}` : 'MEMBER NAME'}</p>
            <p>CURRENT DATE:{new Date().toLocaleDateString()}</p>
            <div style={styles.ratingStars}>{renderStars()}</div>

          </b>
            
            
            <p style={styles.messageLink}><b>Message Here...Message Here</b></p>
          </div>
        </div>
      </div>

      <div style={{ flex: '1', padding: '20px' }}>
        {/* Content for container 2 */}
      </div>
    </div>
  );
};

export default Profile;
