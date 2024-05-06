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
            .then(data =>{ 
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