/* eslint-disable */
import React from 'react'
import { EventInput, formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
// import interactionPlugin from '@fullcalendar/interaction'
import rrulePlugin from '@fullcalendar/rrule'
import { EventModel, FamilyMemberModel } from '../../models'
import './Calendar.css'
import { ISession } from '../../contexts/SessionContext'
import { Box } from '@mui/material'

interface ICalendar {
  session: ISession
  events: EventModel[]
  deleteEvent: (_id: string) => void
  saveEvent: (_newEvent: EventModel) => void
}

const getFamilyColor = (familyMemebrs: FamilyMemberModel[], seekMemberName?: string | null) => {
  const index = familyMemebrs.findIndex((member) => member.name === seekMemberName)
  if (index !== -1) return familyMemebrs[index].color
  return 'blue'
}

const Calendar: React.FC<ICalendar> = ({ session, events, deleteEvent }) => {
  let eventsForCalendar: EventInput[] = events.map((event) => {
    return {
      id: event.id as string,
      title: event.title,
      color: getFamilyColor(session.family, event.familyMember),
      rrule: {
        freq: 'weekly',
        dtstart: event.start,
        byweekday: event.weekdays,
        until: event.until,
      },
    }
  })

  return (
    <Box>
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
        views={{
          '3day': {
            type: 'timeGrid',
            duration: { days: 3 },
          },
        }}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek,3day,timeGridDay',
        }}
        initialView="timeGridWeek"
        editable
        dayMaxEvents
        events={eventsForCalendar}
        eventClick={({ event }) => deleteEvent(event.id)}
      />
    </Box>
  )
}

export default Calendar
