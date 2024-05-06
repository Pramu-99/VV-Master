import React, { useState, useEffect } from 'react';
import './styles.css';

export default function EventPage() {
    const [events, setEvents] = useState([]);
    const [eventName, setEventName] = useState('');
    const [eventVenue, setEventVenue] = useState('');
    const [eventDetails, setEventDetails] = useState('');
    const [eventDate, setEventDate] = useState('');

    useEffect(() => {
        // Fetch events from backend when component mounts
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch('http://localhost:8000/events');
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setEvents(data);
            } else {
                console.error('Failed to fetch events');
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleAddEvent = async () => {
        try {
            const response = await fetch('http://localhost:8000/event/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    eventname: eventName,
                    venue: eventVenue,
                    details: eventDetails,
                    date: eventDate,
                }),
            });
            if (response.ok) {
                // After successfully adding event, fetch updated events
                fetchEvents();
                // Clear input fields
                setEventName('');
                setEventVenue('');
                setEventDetails('');
                setEventDate('');
            } else {
                console.error('Failed to add event');
            }
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            const response = await fetch(`http://localhost:8000/event/delete/${eventId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                // After successfully deleting event, fetch updated events
                fetchEvents();
            } else {
                console.error('Failed to delete event');
            }
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };


    return (
        <div className="container py-4 bg-body">
            <h3 className="text-center mb-4">Add and View Events</h3>

            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Add Event</h5>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Event Name"
                                    value={eventName}
                                    onChange={(e) => setEventName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Event Venue"
                                    value={eventVenue}
                                    onChange={(e) => setEventVenue(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="date"
                                    className="form-control"
                                    placeholder="Event Date"
                                    value={eventDate}
                                    onChange={(e) => setEventDate(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <textarea
                                    className="form-control"
                                    placeholder="Event Details"
                                    value={eventDetails}
                                    onChange={(e) => setEventDetails(e.target.value)}
                                ></textarea>
                            </div>
                            <button className="btn btn-primary" onClick={handleAddEvent}>
                                Add Event
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    {/* Display added events */}
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Added Events</h5>
                            {events.length === 0 ? (
                                <p className="text-muted">No events added yet.</p>
                            ) : (
                                <ul className="list-group">
                                    {events.existingPosts.map((event, index) => (
                                        <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                                            <div>
                                                <h6 className="card-subtitle mb-2">{event.eventname}</h6>
                                                <p className="card-text">Venue: {event.venue}</p>
                                                <p className="card-text">Date: {event.date}</p>
                                                <p className="card-text">Details: {event.details}</p>
                                            </div>
                                            <button className="btn btn-danger" onClick={() => handleDeleteEvent(event._id)}>Delete</button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="text-center fixed-bottom mb-3" id="footer">
                <p>&copy; Vanni Vogue Camera Club</p>
            </footer>
        </div>
    );
}
