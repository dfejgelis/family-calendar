import * as React from 'react'
import { ToggleButton, ToggleButtonGroup, FormLabel } from '@mui/material'
import { WeekDayType } from '../../models'

const weekdays: WeekDayType[] = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su']

interface WeekdayPickerProps {
  selectedWeekdays: WeekDayType[]
  onWeekdayChange: (_selectedWeekdays: WeekDayType[]) => void
  error?: boolean
}

const WeekdayPicker: React.FC<WeekdayPickerProps> = ({
  selectedWeekdays,
  onWeekdayChange,
  error = false,
}) => {
  const handleChange = (_: React.MouseEvent<HTMLElement>, selected: WeekDayType[]) =>
    onWeekdayChange(selected)

  return (
    <>
      <FormLabel color={error ? 'error' : undefined}>Week days: </FormLabel>
      <ToggleButtonGroup onChange={handleChange} value={selectedWeekdays} color="error">
        {weekdays.map((weekday) => (
          <ToggleButton key={`weekday-${weekday}`} value={weekday}>
            {weekday}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </>
  )
}

export default WeekdayPicker
