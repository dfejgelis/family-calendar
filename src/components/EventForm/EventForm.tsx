import React, { ChangeEvent } from 'react'
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  CssBaseline,
  FormControl,
  TextField,
  Typography,
} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers'
import { EventModel } from '../../models'

interface IProps {
  event?: Partial<EventModel>
  saveEvent: (_event: EventModel) => EventModel
  onCancel: () => void
}

type ErrorsType = {
  title?: string
  dtstart?: string
}

const EventForm: React.FC<IProps> = ({ event: iniialData, saveEvent, onCancel }) => {
  const [data, setData] = React.useState<Partial<EventModel>>(iniialData || {})
  const [errors, setErrors] = React.useState<ErrorsType>({})
  const { title } = data

  // FIXME in EventModel (:@)
  // @ts-ignore
  const dtstart = data.rrule?.dtstart
  // @ts-ignore
  const until = data.rrule?.until

  const checkErrors = () => {
    const errorsNew = { ...errors }

    if (!data.title) errorsNew.title = 'Please enter a title'
    if (!dtstart) errorsNew.dtstart = 'Please enter a start date'

    setErrors(errorsNew)
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
      },
    })
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
    checkErrors()
  }

  return (
    <FormControl>
      <CssBaseline />

      <Typography variant="h4">Add event</Typography>
      <DialogContent>
        <DialogContentText>To add a event, please fill in the information below.</DialogContentText>
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
            onChange={onChange}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box mb={2} mt={5}>
              <DateTimePicker
                label="Start date"
                value={dtstart}
                ampm={true}
                minutesStep={30}
                onChange={(newValue) =>
                  setData((prevState) => ({
                    ...prevState,
                    dtstart: newValue,
                  }))
                }
                // renderInput={(params) => <TextField {...params} />}
              />
            </Box>

            <DateTimePicker
              label="End date"
              minDate={dtstart}
              minutesStep={15}
              ampm={true}
              value={until}
              onChange={(newValue) =>
                setData((prevState) => ({
                  ...prevState,
                  until: newValue,
                }))
              }
              //   renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
      </DialogContent>
      <DialogActions>
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
      </DialogActions>
    </FormControl>
  )
}

export default EventForm
