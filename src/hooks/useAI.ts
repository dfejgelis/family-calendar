import { useState } from 'react'
import { IMessage, createAssistantResponse } from '../lib/ai'

interface IuseAI {
  messages: IMessage[]
  submit: (_userInput: string) => void
  clearMessages: () => void
  loading: boolean
}

interface useAIParams {
  prompt: string
}

export default function useAI({ prompt }: useAIParams): IuseAI {
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<IMessage[]>([])

  const submit = async (userInput: string) => {
    console.log('prompt', prompt)
    setLoading(true)
    setMessages([...messages, { role: 'user', content: userInput }])
    const response = await createAssistantResponse(userInput, [
      { role: 'system', content: prompt },
      ...messages,
    ])
    setMessages([...messages, { role: 'user', content: userInput }, response])
    setLoading(false)
  }

  const clearMessages = () => setMessages([])

  return { messages, loading, submit, clearMessages }
}
