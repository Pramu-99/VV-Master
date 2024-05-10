import React, { useState, useEffect } from 'react';
import './styles.css';
function Calendar() {
    const [eventDates, setEventDates] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [eventNames, setEventNames] = useState([]);

    useEffect(() => {
        fetchEventDates();
    }, [currentDate]);

    const fetchEventDates = async () => {
        try {
            const response = await fetch('http://localhost:8000/events');
            if (response.ok) {
                const events = await response.json();
                const dates = events.existingPosts.map(event => new Date(event.date)); // Assuming event date is in ISO string format
                const eventName = events.existingPosts.map(event => event.eventname);
                setEventDates(dates);
                setEventNames(eventName);
            } else {
                console.error('Failed to fetch event dates');
            }
        } catch (error) {
            console.error('Error fetching event dates:', error);
        }
    };

    const renderCalendarCells = () => {
        const currentMonth = currentDate.getMonth();
        const daysInMonth = new Date(currentDate.getFullYear(), currentMonth + 1, 0).getDate();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentMonth, 1).getDay();
        const calendarCells = [];

        let dayCounter = 1;
        for (let i = 0; i < 6; i++) {
            const calendarRow = [];
            for (let j = 0; j < 7; j++) {
                if ((i === 0 && j < firstDayOfMonth) || dayCounter > daysInMonth) {
                    calendarRow.push(<td key={i * 7 + j}></td>);
                } else {
                    const cellDate = new Date(currentDate.getFullYear(), currentMonth, dayCounter);
                    const isEventDate = eventDates.some(eventDate => isSameDate(eventDate, cellDate));
                    const cellClassName = isEventDate ? 'bg-info text-white' : '';
                    const eventName = eventNames.find((name, index) => isSameDate(eventDates[index], cellDate));
                    calendarRow.push(
                        <td key={i * 7 + j} className={cellClassName} title={eventName ? eventName : null}>
                            {dayCounter}
                        </td>
                    );
                    dayCounter++;
                }
            }
            calendarCells.push(<tr key={i}>{calendarRow}</tr>);
        }

        return <tbody>{calendarCells}</tbody>;
    };

    const isSameDate = (date1, date2) => {
        return date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear();
    };

    const handlePrevMonth = () => {
        setCurrentDate(prevDate => {
            const prevMonth = prevDate.getMonth() - 1;
            return new Date(prevDate.getFullYear(), prevMonth, 1);
        });
    };

    const handleNextMonth = () => {
        setCurrentDate(prevDate => {
            const nextMonth = prevDate.getMonth() + 1;
            return new Date(prevDate.getFullYear(), nextMonth, 1);
        });
    };

    const monthName = () => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return months[currentDate.getMonth()];
    };

    return (
        <div className="container">
            <h2 className="text-center mt-5 mb-3">{monthName()} Event Calendar</h2>
            <div className="d-flex justify-content-between mb-3">
                <button className="btn btn-primary cal-btn" onClick={handlePrevMonth}>Previous Month</button>
                <button className="btn btn-primary cal-btn" onClick={handleNextMonth}>Next Month</button>
            </div>
            <div className="calendar border-left">
                <table className="table table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th className="bg-primary text-white">Sun</th>
                            <th className="bg-primary text-white">Mon</th>
                            <th className="bg-primary text-white">Tue</th>
                            <th className="bg-primary text-white">Wed</th>
                            <th className="bg-primary text-white">Thu</th>
                            <th className="bg-primary text-white">Fri</th>
                            <th className="bg-primary text-white">Sat</th>
                        </tr>
                    </thead>
                    {renderCalendarCells()}
                </table>
            </div>


            <footer className="text-center fixed-bottom mb-3" id='footer'>
                <p>&copy; Vanni Vogue Camera Club</p>
            </footer>
        </div>
    );
}

export default Calendar;