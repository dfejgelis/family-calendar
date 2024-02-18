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

const EventForm: React.FC<IProps> = ({ event: iniialData, saveEvent, onCancel }) => {
  const [data, setData] = React.useState(iniialData || {})
  const { title, start, end, allDay } = data

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }

  const isDisabled = () => {
    const checkend = () => !allDay && end === null
    return title === '' || start === null || checkend()
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
            variant="outlined"
            onChange={onChange}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box mb={2} mt={5}>
              <DateTimePicker
                label="Start date"
                value={start}
                ampm={true}
                minutesStep={30}
                onChange={(newValue) =>
                  setData((prevState) => ({
                    ...prevState,
                    // start: new Date(newValue!),
                    start: newValue,
                  }))
                }
                // renderInput={(params) => <TextField {...params} />}
              />
            </Box>

            <DateTimePicker
              label="End date"
              disabled={allDay}
              minDate={start}
              minutesStep={30}
              ampm={true}
              value={end}
              onChange={(newValue) =>
                setData((prevState) => ({
                  ...prevState,
                  end: newValue,
                }))
              }
              //   renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          onClick={() => {
            if (window.confirm('are you sure to discard changes?')) onCancel()
          }}
        >
          Cancel
        </Button>
        <Button
          disabled={isDisabled()}
          color="success"
          onClick={() => saveEvent(data)}
          variant="outlined"
        >
          Save Event
        </Button>
      </DialogActions>
    </FormControl>
  )
}

export default EventForm
