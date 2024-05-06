import React, { useState, useEffect } from 'react';
import './styles.css';
import AdminNavbar from './AdminNavbar';

export default function EventPage() {
    const [cameras, setCameras] = useState([]);
    const [cameraName, setCameraName] = useState('');
    const [cameraBrand, setCameraBrand] = useState('');
    const [details, setDetails] = useState('');
    const [type, setType] = useState('');
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
                    itemtype: type,
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

    return (
        <div>
            <AdminNavbar />
            <div className="container py-4 bg-body">
                <h3 className="text-center mb-4">Add and View Cameras</h3>

                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title mb-4">Add Camera</h5>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Camera Name"
                                        value={cameraName}
                                        onChange={(e) => setCameraName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Camera Brand"
                                        value={cameraBrand}
                                        onChange={(e) => setCameraBrand(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Camera Type: (Camera Or Drone)"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Details"
                                        value={details}
                                        onChange={(e) => setDetails(e.target.value)}
                                    />
                                </div>
                                <button className="btn btn-primary text-capitalize" onClick={handleAddCamera}>
                                    Add Camera
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title mb-4">Added Cameras</h5>
                                {cameras.length === 0 ? (
                                    <p className="text-muted">No cameras added yet.</p>
                                ) : (
                                    <ul className="list-group">
                                        {cameras.existingPosts.map((camera, index) => (
                                            <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                                                <div>
                                                    <h6 className="card-subtitle mb-2">{camera.name} {camera.brand}</h6>
                                                    <p className="card-text">Type: {camera.itemtype}</p>
                                                    <p className="card-text">Serial: {camera.details}</p>
                                                </div>
                                                <button className="btn btn-danger" onClick={() => handleDeleteCamera(camera._id)}>Delete</button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
