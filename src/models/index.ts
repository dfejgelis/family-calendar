import { EventInput } from '@fullcalendar/core'

export type ByWeekDayType = 'mo' | 'tu' | 'we' | 'th' | 'fr' | 'sa' | 'su'

export interface EventModel extends EventInput {
  //   id: string
  // rrule: {
  //   freq: 'weekly'
  //   byweekday: ByWeekDayType[]
  //   dtstart: string
  //   dtend?: string
  // }
}
