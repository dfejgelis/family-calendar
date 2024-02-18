/* eslint-disable */
import React from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
// import interactionPlugin from '@fullcalendar/interaction'
import rrulePlugin from '@fullcalendar/rrule'
import { EventModel } from '../../models'
import './Calendar.css'

const Calendar: React.FC<{ events: EventModel[] }> = ({ events }) => {
  return (
    <div className="calendar-container">
      {process.env.REACT_APP_DEBUG_MODE && (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <strong>{event.id}</strong>
              {event.start && (
                <span>
                  {formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}
                </span>
              )}
              <i>{`${event.title} - ${JSON.stringify(event)}`}</i>
            </li>
          ))}
        </ul>
      )}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, rrulePlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        initialView="timeGridWeek"
        editable
        dayMaxEvents
        events={events}
        // select={this.handleDateSelect}
        // eventContent={renderEventContent}
        // eventClick={this.handleEventClick}
        // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
      />
    </div>
  )
}

export default Calendar
