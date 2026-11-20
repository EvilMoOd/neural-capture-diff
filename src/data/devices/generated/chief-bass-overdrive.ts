import type { Device } from '../../../types'

export const chiefBassOverdrive: Device = {
  id: 'chief-bass-overdrive',
  name: 'Chief Bass Overdrive',
  note: 'Quad Cortex Factory Captures This is a capture of Boss® Bass Overdrive ODB-3® pedal.',
  captures: [
    {
      id: 1,
      params: {
        Level: 10,
        'EQ Hi': 5,
        'EQ Lo': 5,
        Balance: '10 (Blend 100% OD)',
        Gain: 0,
      },
    },
    {
      id: 2,
      params: {
        Level: 10,
        'EQ Hi': 5,
        'EQ Lo': 5,
        Balance: '10 (Blend 100% OD)',
        Gain: 2,
      },
    },
    {
      id: 3,
      params: {
        Level: 10,
        'EQ Hi': 5,
        'EQ Lo': 5,
        Balance: '10 (Blend 100% OD)',
        Gain: 5,
      },
    },
    {
      id: 4,
      params: {
        Level: 10,
        'EQ Hi': 5,
        'EQ Lo': 5,
        Balance: '10 (Blend 100% OD)',
        Gain: 8,
      },
    },
  ],
}
