import type { Device } from '../../../types'

export const madproGolden: Device = {
  id: 'madpro-golden',
  name: 'MadPro Golden',
  note: 'Quad Cortex Factory Captures This is a capture of Mad Professor® Golden Cello® pedal.',
  captures: [
    {
      id: 1,
      params: {
        Delay: 0,
        Drive: 3,
        Volume: 10,
        Tone: 5.5,
      },
    },
    {
      id: 2,
      params: {
        Delay: 0,
        Drive: 5,
        Volume: 10,
        Tone: 5,
      },
    },
    {
      id: 3,
      params: {
        Delay: 0,
        Drive: 8,
        Volume: 10,
        Tone: 7.5,
      },
    },
    {
      id: 4,
      params: {
        Delay: 0,
        Drive: 8,
        Volume: 10,
        Tone: 5,
      },
    },
  ],
}
