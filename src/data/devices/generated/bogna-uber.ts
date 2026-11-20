import type { Device } from '../../../types'

export const bognaUber: Device = {
  id: 'bogna-uber',
  name: 'Bogna Uber',
  note: "Quad Cortex Factory Captures This is a capture of Bogner® Überschall® first edition with JJ® EL34 tubes",
  captures: [
    {
      id: 1,
      params: {
        'M.Volume': 6,
        Volume: 6,
        Presence: 8,
        Treble: 0,
        Middle: 5,
        Bass: 8,
        Gain: 2,
      },
    },
    {
      id: 2,
      params: {
        'M.Volume': 6,
        Volume: 6,
        Presence: 8,
        Treble: 2,
        Middle: 8,
        Bass: 8,
        Gain: 5,
      },
    },
    {
      id: 3,
      params: {
        'M.Volume': 6,
        Volume: 8,
        Presence: 6,
        Treble: 6.5,
        Middle: 8,
        Bass: 2,
        Gain: 0,
        'Pedal 1': 'Xotic Effects® BB Preamp®',
      },
    },
    {
      id: 4,
      params: {
        'M.Volume': 5,
        Volume: 8,
        Presence: 3.5,
        Treble: 6.5,
        Middle: 6.5,
        Bass: 2,
        Gain: 0,
        'Pedal 1': 'Xotic Effects® BB Preamp®',
      },
    },
  ],
}
