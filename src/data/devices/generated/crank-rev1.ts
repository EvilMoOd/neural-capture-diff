import type { Device } from '../../../types'

export const crankRev1: Device = {
  id: 'crank-rev1',
  name: 'Crank Rev1',
  note: 'Quad Cortex Factory Captures This is a capture of Krank® Rev1® amp.',
  captures: [
    {
      id: 1,
      params: {
        Channel: 2,
        Presence: 3.5,
        Sweep: 3.5,
        Bass: 6.5,
        Midrange: 3.5,
        Treble: 8,
        'Master 2': 8.5,
        Gain: 1,
      },
    },
    {
      id: 2,
      params: {
        Channel: 2,
        Presence: 3.5,
        Sweep: 5,
        Bass: 6,
        Midrange: 5,
        Treble: 8,
        'Master 2': 8,
        Gain: 6.5,
      },
    },
  ],
}
