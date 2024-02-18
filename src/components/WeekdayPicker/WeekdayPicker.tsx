import * as React from 'react'
import { ToggleButton, ToggleButtonGroup, FormLabel } from '@mui/material'
import { ByWeekDayType } from '../../models'

const weekdays: ByWeekDayType[] = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su']

interface WeekdayPickerProps {
  selectedWeekdays: ByWeekDayType[]
  onWeekdayChange: (_selectedWeekdays: ByWeekDayType[]) => void
  error?: boolean
}

const WeekdayPicker: React.FC<WeekdayPickerProps> = ({
  selectedWeekdays,
  onWeekdayChange,
  error = false,
}) => {
  const handleChange = (_: React.MouseEvent<HTMLElement>, selected: ByWeekDayType[]) => {
    console.log('selected', selected)
    onWeekdayChange(selected)
  }

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
