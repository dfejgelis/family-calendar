import React from 'react'
import {
  Avatar,
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grow,
} from '@mui/material'
import HourglassBottomTwoToneIcon from '@mui/icons-material/HourglassBottomTwoTone'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import SendIcon from '@mui/icons-material/Send'
import EventForm from '../../components/EventForm/EventForm'
import { EventModel } from '../../models'
import { ISession } from '../../contexts/SessionContext'
import FamilyCalendarPrompt from '../../lib/ai/prompts/familyCalendar'
import useAI from '../../hooks/useAI'
import { IAssistantResponse, IMessage } from '../../lib/ai'

const examples = {
  'Basketball Practice Partial': 'Julian will go to basket on Mondays and Thursdays',
  'Basketball Practice Complete':
    'Julian will go to basket on Mondays, Tuesdays and Saturdays starting today at 10am',
  Education: 'What can you do?',
  'Delete Event': 'Delete basketball event',
}

const MessageFC = ({ message }: { message: IMessage }) => {
  if (message.role === 'system') return null
  const isBot = message.role === 'assistant'

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isBot ? 'flex-start' : 'flex-end',
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: isBot ? 'row' : 'row-reverse',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ bgcolor: isBot ? 'primary.main' : 'secondary.main' }}>
          {isBot ? 'B' : 'U'}
        </Avatar>
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            ml: isBot ? 1 : 0,
            mr: isBot ? 0 : 1,
            backgroundColor: isBot ? 'primary.light' : 'secondary.light',
            borderRadius: isBot ? '20px 20px 20px 5px' : '20px 20px 5px 20px',
          }}
        >
          <Typography variant="body1">{message.content}</Typography>
        </Paper>
      </Box>
    </Box>
  )
}

type ChatUIProps = {
  session: ISession
  events: EventModel[]
  saveEvent: (_: EventModel) => EventModel
  deleteEvent: (_: string) => void
}

const ChatUI: React.FC<ChatUIProps> = ({ events, session, saveEvent, deleteEvent }) => {
  const [input, setInput] = React.useState('')

  const prompt = FamilyCalendarPrompt({
    familyMembers: session.family,
    name: session.user || '',
    eventsForPrompt: events,
  })

  const { messages, submit, loading, clearMessages } = useAI({ prompt })

  const selectExample = (userInput: string) => {
    setInput(userInput)
    // submit(userInput)
  }

  const assistantResponse: Partial<IAssistantResponse> = messages[messages.length - 1]?.data || {}
  const { action } = assistantResponse

  React.useEffect(() => {
    if (action === 'stop') clearMessages()
    if (action === 'eventDelete' && assistantResponse?.event?.id) {
      deleteEvent(assistantResponse.event.id)
      clearMessages()
    }
  }, [action])

  const handleSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (input.trim() !== '') {
      submit(input.trim())
      setInput('')
    }
  }

  return (
    <Box
      sx={{
        // height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        // border: '1px solid #ccc',
      }}
    >
      {process.env.REACT_APP_DEBUG_MODE && (
        <div>
          {JSON.stringify(
            messages.filter((msg) => msg.role !== 'system'),
            undefined,
            2
          )}
        </div>
      )}
      <Box sx={{ backgroundColor: 'background.default' }}>
        <form onSubmit={handleSend}>
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <TextField
                fullWidth
                size="small"
                autoFocus
                placeholder="Type a message"
                variant="outlined"
                disabled={loading}
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                fullWidth
                size="large"
                color="primary"
                disabled={loading}
                variant="contained"
                type="submit"
              >
                {loading ? <HourglassBottomTwoToneIcon /> : <SendIcon />}
              </Button>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id="label-example" size="small">
                  Examples
                </InputLabel>
                <Select
                  size="small"
                  labelId="label-example"
                  label="Example"
                  onChange={(event) => selectExample(event.target.value as string)}
                >
                  {Object.keys(examples).map((key, idx) => (
                    // @ts-ignore
                    <MenuItem value={examples[key]} key={`example-${idx}`}>
                      {key}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </form>

        <Box sx={{ flexGrow: 1, overflow: 'auto', pt: 2 }}>
          {messages
            .slice()
            .reverse()
            .map((message, idx) => (
              <MessageFC key={`message-${idx}`} message={message} />
            ))}
        </Box>
      </Box>
      {action && ['eventCreate', 'eventEdit'].includes(action) && (
        <Box>
          <EventForm
            familyMembers={session.family}
            saveEvent={(props) => {
              clearMessages()
              return saveEvent(props)
            }}
            event={assistantResponse.event}
            onCancel={clearMessages}
          />
        </Box>
      )}
      {Boolean(messages.length) && (
        <Box>
          <Button
            fullWidth
            onClick={() => clearMessages()}
            variant="contained"
            size="small"
            aria-label="close"
          >
            <ArrowDropUpIcon fontSize="small" />
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default ChatUI
