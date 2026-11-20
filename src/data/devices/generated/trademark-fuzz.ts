import type { Device } from '../../../types'

export const trademarkFuzz: Device = {
  id: 'trademark-fuzz',
  name: 'Trademark Fuzz',
  note: "Captured Device: Hallmark® Guitars Nu-Fuzz™",
  captures: [
    {
      id: 1,
      params: {
        Tone: 0,
        Level: 10,
      },
    },
    {
      id: 2,
      params: {
        Tone: 3.5,
        Level: 10,
      },
    },
    {
      id: 3,
      params: {
        Tone: 6.5,
        Level: 10,
      },
    },
    {
      id: 4,
      params: {
        Tone: 10,
        Level: 10,
      },
    },
    {
      id: 5,
      params: {
        Tone: 0,
        Level: 7.5,
      },
    },
    {
      id: 6,
      params: {
        Tone: 3.5,
        Level: 7.5,
      },
    },
    {
      id: 7,
      params: {
        Tone: 6.5,
        Level: 7.5,
      },
    },
    {
      id: 8,
      params: {
        Tone: 10,
        Level: 7.5,
      },
    },
  ],
}
