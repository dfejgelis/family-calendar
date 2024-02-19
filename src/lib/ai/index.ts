/* eslint-disable import/prefer-default-export */
import OpenAI from 'openai'

import FamilyCalendarPrompt, { FamilyCalendarPromptContext } from './prompts/familyCalendar'

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  organization: process.env.REACT_APP_OPENAI_ORGANIZATION,
  dangerouslyAllowBrowser: true,
})

type ActionType = 'eventEdit' | 'eventCreate' | 'stop' | 'moderated' | 'chat'

interface IAssistantResponse {
  expl: string
  msg: string
  action: ActionType
}

const getAssistantMessage = async ({
  messages,
  prompt,
}: {
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[]
  prompt: string
}) =>
  openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: prompt,
      },
      ...messages,
    ],
  })

export const createAssistantResponse = async (
  userInput: string,
  context: FamilyCalendarPromptContext,
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = []
) => {
  const userMessage: OpenAI.Chat.Completions.ChatCompletionMessageParam = {
    role: 'user',
    content: userInput,
  }

  const prompt = FamilyCalendarPrompt(context)
  console.log('prompt', prompt)

  const response = await getAssistantMessage({
    messages: [...messages, userMessage],
    prompt,
  })

  console.log('choices', response.choices[0])

  const assistantData = JSON.parse(
    response.choices[0].message.content || '{}'
  ) as IAssistantResponse

  return {
    role: response.choices[0].message.role,
    content: assistantData.msg,
    data: assistantData,
  }
}
