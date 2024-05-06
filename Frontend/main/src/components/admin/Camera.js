import React, { useState, useEffect } from 'react';
import './styles.css';
import AdminNavbar from './AdminNavbar';

export default function EventPage() {
    const [cameras, setCameras] = useState([]);
    const [cameraName, setCameraName] = useState('');
    const [cameraBrand, setCameraBrand] = useState('');
    const [details, setDetails] = useState('');
    const [type,setType] = useState('');
    useEffect(() => {
        fetchCameras();
    }, []);

    const fetchCameras = async () => {
        try {
            const response = await fetch('http://localhost:8000/equipments');
            if (response.ok) {
                const data = await response.json();
                setCameras(data);
            } else {
                console.error('Failed to fetch cameras');
            }
        } catch (error) {
            console.error('Error fetching cameras:', error);
        }
    };

    const handleAddCamera = async () => {
        try {
            const response = await fetch('http://localhost:8000/equipment/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: cameraName,
                    itemtype:type,
                    brand: cameraBrand,
                    details: details,
                }),
            });
            if (response.ok) {
                fetchCameras();
                setCameraName('');
                setType('');
                setDetails('');
                setCameraBrand('');
            } else {
                console.error('Failed to add camera');
            }
        } catch (error) {
            console.error('Error adding camera:', error);
        }
    };

    const handleDeleteCamera = async (cameraId) => {
        try {
            const response = await fetch(`http://localhost:8000/equipment/delete/${cameraId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchCameras();
            } else {
                console.error('Failed to delete camera');
            }
        } catch (error) {
            console.error('Error deleting camera:', error);
        }
    };