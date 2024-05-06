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