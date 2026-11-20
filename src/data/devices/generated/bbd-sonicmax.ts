import type { Device } from '../../../types'

export const bbdSonicmax: Device = {
  id: 'bbd-sonicmax',
  name: 'BBD SonicMax',
  note: 'Quad Cortex Factory Captures This is a capture of BBE® Sonic Stomp® pedal.',
  captures: [
    {
      id: 1,
      params: {
        'Lo Contour': 5,
        Process: 0,
      },
    },
    {
      id: 2,
      params: {
        'Lo Contour': 0,
        Process: 5,
      },
    },
    {
      id: 3,
      params: {
        'Lo Contour': 5,
        Process: 5,
      },
    },
    {
      id: 4,
      params: {
        'Lo Contour': 6.5,
        Process: 8,
      },
    },
  ],
}
