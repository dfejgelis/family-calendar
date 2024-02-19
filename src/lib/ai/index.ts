/* eslint-disable import/prefer-default-export */
import OpenAI from 'openai'
import { WeekDayType } from '../../models'

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  organization: process.env.REACT_APP_OPENAI_ORGANIZATION,
  dangerouslyAllowBrowser: true,
})

type ActionType = 'eventEdit' | 'eventCreate' | 'eventDelete' | 'stop' | 'moderated' | 'chat'

export interface IAssistantResponse {
  expl: string
  msg: string
  action: ActionType
  event: Partial<{
    id: string
    title: string
    familyMember: string
    start: string
    until: string
    weekdays: WeekDayType[]
  }>
}

export interface IMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
  data?: IAssistantResponse
}

const getAssistantMessage = async (messages: IMessage[]) =>
  openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    response_format: { type: 'json_object' },
    messages,
  })

const cleanMessagesForOpenAI = (messages: IMessage[]) =>
  messages.map((message) => {
    const newMessage = message
    delete newMessage.data
    return newMessage
  })
export const createAssistantResponse = async (userInput: string, messages: IMessage[] = []) => {
  const userMessage: IMessage = {
    role: 'user',
    content: userInput,
  }

  const response = await getAssistantMessage([...cleanMessagesForOpenAI(messages), userMessage])

  console.log('OpenAI response', response.choices[0])

  const assistantData = JSON.parse(
    response.choices[0].message.content || '{}'
  ) as IAssistantResponse

  return {
    role: response.choices[0].message.role,
    content: assistantData.msg,
    data: assistantData || undefined,
  }
}
