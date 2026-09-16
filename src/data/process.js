import { MessagesSquare, Map, Code2, Rocket } from 'lucide-react'

/** The four-step engagement, written from the client's point of view. */
export const processSteps = [
  {
    step: '01',
    icon: MessagesSquare,
    title: 'Discuss',
    description:
      'Tell me about your business, your goals and what you need. No technical vocabulary required.',
  },
  {
    step: '02',
    icon: Map,
    title: 'Plan',
    description:
      'I work out the scope and come back with a clear plan, a timeline and a quote before anything is built.',
  },
  {
    step: '03',
    icon: Code2,
    title: 'Build',
    description:
      'Development starts, with regular updates and checkpoints so you can see progress and give feedback.',
  },
  {
    step: '04',
    icon: Rocket,
    title: 'Launch',
    description:
      'Your website goes live. I handle deployment and walk you through everything at handover.',
  },
]
