import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";

import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

function MyCalendar() {
    const localizer = momentLocalizer(moment);
    
    const [events, setEvents] = useState([]);

    useEffect(() => {
        showEvents();
    }, []); 

    const showEvents = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => setEvents(data))
        .catch(err => console.error(err))
    };

    return (
        <div style={{ height: 580, margin: 10 }}>
            <Calendar
                localizer={localizer}
                events={events}
                titleAccessor={(event) => 
                                    event.activity + ' / ' + 
                                    event.customer.firstname + ' ' + 
                                    event.customer.lastname}
                startAccessor={(event) => moment(event.date).toDate()}
                endAccessor={(event) => moment(event.date).add(event.duration, "minutes").toDate()}
                step={30}
                defaultView='month'
                views={['month','week','day','agenda']}
                defaultDate={new Date()}
            />
        </div> 
    );
}

export default MyCalendar;