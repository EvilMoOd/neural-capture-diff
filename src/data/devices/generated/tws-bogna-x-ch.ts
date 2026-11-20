import type { Device } from '../../../types'

export const twsBognaXCh: Device = {
  id: 'tws-bogna-x-ch',
  name: "TW's Bogna X Ch",
  note: "Raw Capture from Bogna X 101B Ch.2 made by Tuomas Wäinölä at Sunbeam Studio.",
  captures: [
    {
      id: 1,
      params: {
        Presence: 6.5,
        Volume: 10,
        Treble: 5,
        Middle: 5,
        Bass: 5,
        Gain: 2,
        'Gain Boost': 'Low',
        'Pre EQ': 'B1',
      },
    },
    {
      id: 2,
      params: {
        Volume: 4,
        Treble: 5,
        Middle: 6,
        Bass: 7,
        Gain: 10,
        'Plexi Mode': 0,
        Structure: 'High',
        'Boost Gain': 'High',
        'Pre EQ': 'N',
      },
    },
    {
      id: 3,
      params: {
        Volume: 3.5,
        Treble: 5,
        Middle: 5,
        Bass: 5,
        Gain: 8,
        'Plexi Mode': 0,
        Structure: 'High',
        'Boost Gain': 'High',
        'Pre EQ': 'B2',
      },
    },
  ],
}
