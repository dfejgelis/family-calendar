import { createAssistantResponse } from '.'
import FamilyCalendarPrompt, { FamilyCalendarPromptContext } from './prompts/familyCalendar'

const contextBase: FamilyCalendarPromptContext = {
  name: 'Naruto',
  eventsForPrompt: [],
  familyMembers: [
    { name: 'Naruto', description: 'parent (user)', color: 'red' },
    { name: 'Boruto', description: 'children', color: 'red' },
    { name: 'Himawari', description: 'children', color: 'red' },
    { name: 'Hinata', description: 'parent', color: 'red' },
  ],
}

// @ts-ignore
const createAssistantResponseParams = [
  // ['fuck', 'moderated', 'terms of use'],
  ['how my family is composed?', 'chat', 'Boruto'],
  // ['tell me a joke', 'chat', ''],
]

// Keeping these commented out and skipped in repo to be sure not to consume quota in vain.
// Feel free to use (uncomment) when needed
describe.skip('createAssistantResponse', () => {
  // @ts-ignore
  it.each(createAssistantResponseParams)(
    'should return expectedish response',
    async (userContent: string, expectedAction: string, expectedishMsg: string) => {
      const { content, data: assistantMessage } = await createAssistantResponse(userContent, [
        {
          role: 'system',
          content: FamilyCalendarPrompt(contextBase),
        },
      ])

      expect(assistantMessage.msg).toBe(content)
      expect(assistantMessage.msg).toContain(expectedishMsg)
      expect(assistantMessage.action).toContain(expectedAction)
    }
  )
})
