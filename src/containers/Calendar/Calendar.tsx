/* eslint-disable */
import React from 'react'
import { EventInput, formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
// import interactionPlugin from '@fullcalendar/interaction'
import rrulePlugin from '@fullcalendar/rrule'
import { EventModel } from '../../models'
import './Calendar.css'

interface ICalendar {
  events: EventModel[]
  deleteEvent: (_id: string) => void
}

const Calendar: React.FC<ICalendar> = ({ events, deleteEvent }) => {
  let eventsForCalendar: EventInput[] = events.map((event) => {
    return {
      id: event.id as string,
      title: event.title,
      rrule: {
        freq: 'weekly',
        dtstart: event.start,
        byweekday: event.weekdays,
        // until: event.until,
      },
    }
  })

  return (
    <div className="calendar-container">
      {process.env.REACT_APP_DEBUG_MODE && (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <strong>{event.id}</strong>
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
        events={eventsForCalendar}
        // select={this.handleDateSelect}
        // eventContent={renderEventContent}
        eventClick={({ event }) => {
          if (confirm(`are you sure you want to delete ${event.title}`)) deleteEvent(event.id)
        }}
        // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
      />
    </div>
  )
}

export default Calendar
