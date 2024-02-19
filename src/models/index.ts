export type WeekDayType = 'mo' | 'tu' | 'we' | 'th' | 'fr' | 'sa' | 'su'

export interface EventModel {
  id: string | null
  title: string
  familyMember: string
  weekdays: WeekDayType[]
  start: string
  until?: string | null
}

export interface FamilyMemberModel {
  name: string
  color: string
  description: string
}
