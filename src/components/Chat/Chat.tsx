import React from 'react'
import {
  Avatar,
  Box,
  Select,
  MenuItem,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { EventInput } from '@fullcalendar/core'

class Message {
  id: number

  text: string

  sender: 'bot' | 'user'

  constructor(id: number, text: string, sender: 'bot' | 'user') {
    this.id = id
    this.text = text
    this.sender = sender
  }
}

const MessageFC = ({ message }: { message: Message }) => {
  const isBot = message.sender === 'bot'

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
          <Typography variant="body1">{message.text}</Typography>
        </Paper>
      </Box>
    </Box>
  )
}

type ChatUIProps = {
  saveEvent: (_event: EventInput) => void
}

const ChatUI: React.FC<ChatUIProps> = ({ saveEvent }) => {
  const [input, setInput] = React.useState('')
  const [messages, setMessages] = React.useState<Message[]>([])

  const handleSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (input.trim() !== '') {
      saveEvent({
        id: '100',
        title: 'from input',
        rrule: {
          freq: 'weekly',
          byweekday: input.split(' '),
          dtstart: '2024-02-01T11:00:00',
          until: '2024-06-01',
        },
      })
      // setMessages([...messages, new Message(messages.length + 1, input, 'user')])
      setInput('')
    }
  }

  const examples = [
    {
      title: 'basket',
      rrule: {
        freq: 'weekly',
        byweekday: ['mo', 'we', 'fr'],
        dtstart: '2024-02-01T17:00:00',
        dtend: '2024-02-01T18:00:00',
        until: '2024-06-01',
      },
    },
  ]

  return (
    <Box
      sx={{
        // height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'grey.200',
      }}
    >
      <div>{JSON.stringify(messages, undefined, 2)}</div>
      <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
        <form onSubmit={handleSend}>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <TextField
                fullWidth
                size="small"
                autoFocus
                placeholder="Type a message"
                variant="outlined"
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />
            </Grid>
            {/* <Grid item xs={5}>
              <Select fullWidth size="small" onChange={(event) => console.log(event.target.value)}>
                {examples.map((value, idx) => (
                  <MenuItem key={`example-${idx}`} value={JSON.stringify(value)}>
                    {value.title}
                  </MenuItem>
                ))}
              </Select>
            </Grid> */}
            <Grid item xs={2}>
              <Button
                fullWidth
                size="large"
                color="primary"
                variant="contained"
                endIcon={<SendIcon />}
                type="submit"
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </form>
        <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
          {messages
            .slice()
            .reverse()
            .map((message) => (
              <MessageFC key={message.id} message={message} />
            ))}
        </Box>
      </Box>
    </Box>
  )
}

export default ChatUI
