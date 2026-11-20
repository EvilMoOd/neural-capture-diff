import type { Device } from '../../../types'

export const exoticSl: Device = {
  id: 'exotic-sl',
  name: 'Exotic SL',
  note: 'Quad Cortex Factory Captures This is a capture of Xotic Effects® SL Drive® pedal.',
  captures: [
    {
      id: 1,
      params: {
        Gain: 0,
        Tone: 5,
        Volume: 10,
      },
    },
    {
      id: 2,
      params: {
        Gain: 1.5,
        Tone: 6,
        Volume: 5.5,
      },
    },
  ],
}
