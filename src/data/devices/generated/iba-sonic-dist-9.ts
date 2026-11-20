import type { Device } from '../../../types'

export const ibaSonicDist9: Device = {
  id: 'iba-sonic-dist-9',
  name: 'Iba Sonic Dist 9',
  note: 'Quad Cortex Factory Captures This is a capture of Ibanez® Sonic Distortion 9® pedal.',
  captures: [
    {
      id: 1,
      params: {
        Dist: 0,
        Tone: 2.5,
        Level: 10,
      },
    },
    {
      id: 2,
      params: {
        Dist: 0,
        Tone: 5,
        Level: 10,
      },
    },
    {
      id: 3,
      params: {
        Dist: 2.5,
        Tone: 0,
        Level: 10,
      },
    },
    {
      id: 4,
      params: {
        Dist: 8,
        Tone: 0,
        Level: 10,
      },
    },
  ],
}
