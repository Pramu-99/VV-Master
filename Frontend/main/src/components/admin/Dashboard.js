import React, { useState, useEffect } from 'react';
import './styles.css';
import { PieChart } from 'react-minimal-pie-chart';
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';
export default function Dashboard() {
    const [memberCount, setMemberCount] = useState(0);
    const [cameraCount, setCameraCount] = useState(0);
    const [eventCount, setEventCount] = useState(0);

    useEffect(() => {
        fetch('http://localhost:8000/posts')
            .then(response => response.json())
            .then(data => {
                setMemberCount(data.existingPosts.length); // Assuming "existingPosts" contains members
                console.log(memberCount);
            })
            .catch(error => console.error('Error fetching member count:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:8000/equipments')
            .then(response => response.json())
            .then(data => {
                setCameraCount(data.existingPosts.length)
            })
            .catch(error => console.error('Error fetching camera count:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:8000/events')
            .then(response => response.json())
            .then(data => {
                setEventCount(data.existingPosts.length)
            })
            .catch(error => console.error('Error fetching event count:', error));
    }, []);

    return (
        <div>
            <AdminNavbar />
            <div className='container py-4 bg-body'>
                <h3 className='text-center mt-2'>Camera Club Facts</h3>
                <div className='container-fluid pb-5 pl-2 w-60' id='bar'>
                    <div className='row g-3 my-2'>
                        <div className="d-flex hi-container">
                            <div className="hi bg-info d-flex align-items-center justify-content-center">
                                <i className="bi bi-person-circle fs-3 me-3 mb-1"></i>
                                <span className="mb-1 font-weight-bold fs-5">{memberCount} Total Members</span>
                            </div>
                            <div className="hi bg-info d-flex align-items-center justify-content-center">
                                <i className="bi bi-camera fs-3 me-3 mb-1"></i>
                                <span className="mb-1 font-weight-bold fs-5">{cameraCount} Total Cameras</span>
                            </div>
                            <div className="hi bg-info d-flex align-items-center justify-content-center">
                                <i className="bi bi-calendar2 fs-3 me-3 mb-1"></i>
                                <span className="mb-1 font-weight-bold fs-5">{eventCount} Total Events</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row g-3">
                    <div className="col-md-4">
                        <div className="p-3 border mb-3">
                            <PieChart
                                data={[
                                    { title: 'Red', value: 10, color: '#E38627' },
                                    { title: 'Blue', value: 15, color: '#C13C37' },
                                    { title: 'Yellow', value: 20, color: '#6A2135' },
                                ]}
                                radius={30}
                            />
                            <h5 className='text-center'>Member Distribution</h5>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="p-3 border mb-3">
                            <PieChart
                                data={[
                                    { title: 'Green', value: 15, color: '#2ecc71' },
                                    { title: 'Purple', value: 10, color: '#9b59b6' },
                                    { title: 'Orange', value: 5, color: '#e67e22' },
                                ]}
                                radius={30}
                            />
                            <h5 className='text-center'>Member Growth</h5>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="p-3 border mb-3">
                            <PieChart
                                data={[
                                    { title: 'Cyan', value: 8, color: '#3498db' },
                                    { title: 'Magenta', value: 6, color: '#e74c3c' },
                                    { title: 'Lime', value: 4, color: '#2ecc71' },
                                ]}
                                radius={30}
                            />
                            <h5 className='text-center'>Event Distribution</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
