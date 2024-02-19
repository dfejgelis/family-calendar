import React, { ChangeEvent } from 'react'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers'
import { WeekDayType, EventModel, FamilyMemberModel } from '../../models'
import WeekdayPicker from '../WeekdayPicker/WeekdayPicker'

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P] | null>
}

interface IProps {
  familyMembers: FamilyMemberModel[]
  event?: RecursivePartial<EventModel>
  saveEvent: (_event: EventModel) => EventModel
  onCancel: () => void
}

type ErrorsType = {
  title?: string
  start?: string
  weekdays?: string
  familyMember?: string
}

const EventForm: React.FC<IProps> = ({
  event: initialData,
  saveEvent,
  onCancel,
  familyMembers,
}) => {
  const [data, setData] = React.useState<RecursivePartial<EventModel>>(initialData || {})
  // @ts-ignore
  const [weekdays, setWeekdays] = React.useState<WeekDayType[]>(initialData?.weekdays || [])
  const [familyMember, setFamilyMember] = React.useState(initialData?.familyMember || '')
  const [errors, setErrors] = React.useState<ErrorsType>({})
  const { title, start, until } = data

  const checkErrors = () => {
    const errorsNew: ErrorsType = {}

    if (!data.title) errorsNew.title = 'Please enter a title'
    if (!start) errorsNew.start = 'Please enter a start date'
    if (!weekdays.length) errorsNew.weekdays = 'Please select week days'
    if (!familyMember) errorsNew.familyMember = 'Please select family member'

    if (process.env.REACT_APP_DEBUG_MODE) {
      console.log('data', data)
      console.log('errors', errorsNew)
    }
    setErrors(errorsNew)
  }

  const changeData = (newData: RecursivePartial<EventModel>) => {
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
      familyMember,
      // @ts-ignore
      start,
      // @ts-ignore
      until,
      weekdays,
    })
  }

  React.useEffect(() => {
    checkErrors()
  }, [weekdays, data, familyMember])

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
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Family Member</InputLabel>
          <Select
            value={familyMember}
            labelId="demo-simple-select-label"
            label="Member"
            error={Boolean(errors.familyMember?.length)}
            onChange={(event) => setFamilyMember(event.target.value)}
          >
            {familyMembers.map((member) => (
              <MenuItem value={member.name} key={`member-${member.name}`}>
                {member.name}
              </MenuItem>
            ))}
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
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
              name="start"
              value={start}
              ampm={true}
              minutesStep={30}
              onChange={(newValue) =>
                changeData({
                  ...data,
                  start: newValue,
                })
              }
            />
          </Box>

          <DateTimePicker
            label="End date"
            minDate={start}
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
