import type { Device } from '../../../types'

export const teabird: Device = {
  id: 'teabird',
  name: 'TeaBird',
  note: 'Quad Cortex Factory Captures This is a capture of custom built TeaBird® pedal.',
  captures: [
    {
      id: 1,
      params: {
        Range: 9,
        Boost: 3,
      },
    },
    {
      id: 2,
      params: {
        Range: 6,
        Boost: 3,
      },
    },
    {
      id: 3,
      params: {
        Range: 2,
        Boost: 3,
      },
    },
    {
      id: 4,
      params: {
        Range: 8,
        Boost: 5,
      },
    },
    {
      id: 5,
      params: {
        Range: 5,
        Boost: 5,
      },
    },
    {
      id: 6,
      params: {
        Range: 0,
        Boost: 5,
      },
    },
    {
      id: 7,
      params: {
        Range: 10,
        Boost: 10,
      },
    },
  ],
}
