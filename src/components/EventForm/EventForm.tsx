import React, { ChangeEvent } from 'react'
import { Box, Button, CssBaseline, FormControl, Stack, TextField, Typography } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers'
import { ByWeekDayType, EventModel } from '../../models'
import WeekdayPicker from '../WeekdayPicker/WeekdayPicker'

interface IProps {
  event?: Partial<EventModel>
  saveEvent: (_event: EventModel) => EventModel
  onCancel: () => void
}

type ErrorsType = {
  title?: string
  dtstart?: string
  weekdays?: string
}

const EventForm: React.FC<IProps> = ({ event: iniialData, saveEvent, onCancel }) => {
  const [data, setData] = React.useState<Partial<EventModel>>(iniialData || {})
  const [weekdays, setWeekdays] = React.useState<ByWeekDayType[]>(
    // @ts-ignore: FIXME in EventModel (:@)
    iniialData?.rrule?.byweekday || []
  )
  const [errors, setErrors] = React.useState<ErrorsType>({})
  const { title } = data

  // @ts-ignore: FIXME in EventModel (:@)
  const { dtstart, until } = data.rrule

  const checkErrors = () => {
    const errorsNew: ErrorsType = {}

    if (!data.title) errorsNew.title = 'Please enter a title'
    if (!dtstart) errorsNew.dtstart = 'Please enter a start date'
    if (!weekdays.length) errorsNew.weekdays = 'Please select week days'

    if (process.env.REACT_APP_DEBUG_MODE) console.log('errors', errorsNew)
    setErrors(errorsNew)
  }

  const changeData = (newData: Partial<EventModel>) => {
    setData(newData)
  }

  const onCancelHandler = () => {
    if (!Object.keys(data)) onCancel()
    // TODO: Make this dialog look nice ;)
    else if (window.confirm('are you sure to discard changes?')) onCancel()
  }

  const onSaveHandler = () => {
    saveEvent({
      ...data,
      rrule: {
        freq: 'weekly',
        dtstart,
        until,
        byweekday: weekdays,
      },
    })
  }

  React.useEffect(() => {
    checkErrors()
  }, [weekdays, data])

  return (
    <FormControl>
      <Typography variant="h4">Add event</Typography>
      <Typography>To add a event, please fill in the information below.</Typography>
      <Box component="form">
        <TextField
          name="title"
          value={title}
          margin="dense"
          id="title"
          label="title"
          type="text"
          fullWidth
          error={Boolean(errors.title)}
          variant="outlined"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            changeData({
              ...data,
              [event.target.name]: event.target.value,
            })
          }}
        />
        <Box display="flex" alignItems="center" mb={2}>
          <WeekdayPicker
            error={Boolean(errors.weekdays)}
            selectedWeekdays={weekdays}
            onWeekdayChange={setWeekdays}
          />
        </Box>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box mb={2} mt={5}>
            <DateTimePicker
              label="Start date"
              name="dtstart"
              value={dtstart}
              ampm={true}
              minutesStep={30}
              onChange={(newValue) =>
                changeData({
                  ...data,
                  dtstart: newValue,
                })
              }
            />
          </Box>

          <DateTimePicker
            label="End date"
            minDate={dtstart}
            minutesStep={15}
            ampm={true}
            value={until}
            onChange={(newValue) =>
              changeData({
                ...data,
                until: newValue,
              })
            }
          />
        </LocalizationProvider>
      </Box>
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button color="error" onClick={() => onCancelHandler()}>
          Cancel
        </Button>
        <Button
          disabled={Object.keys(errors).length > 0}
          color="success"
          onClick={() => onSaveHandler()}
          variant="outlined"
        >
          Save Event
        </Button>
      </Stack>
    </FormControl>
  )
}

export default EventForm
