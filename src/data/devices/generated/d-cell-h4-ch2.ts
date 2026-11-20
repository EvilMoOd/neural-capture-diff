import type { Device } from '../../../types'

export const dCellH4Ch2: Device = {
  id: 'd-cell-h4-ch2',
  name: 'D-Cell H4 Ch2',
  note: 'Quad Cortex Factory Captures This is a capture of Diezel® VH4® amp channel 2.',
  captures: [
    {
      id: 1,
      params: {
        Channel: 2,
        'Bright On/Off': 'Off',
        Gain: 5,
        Volume: 8,
        Treble: 8,
        Middle: 8,
        Bass: 8,
        'Master Volume': 6.5,
        Presence: 3.5,
        Deep: 5,
      },
    },
    {
      id: 2,
      params: {
        Channel: 2,
        'Bright On/Off': 'On',
        Gain: 8,
        Volume: 8,
        Treble: 8,
        Middle: 8,
        Bass: 8,
        'Master Volume': 6.5,
        Presence: 3.5,
        Deep: 5,
      },
    },
  ],
}
