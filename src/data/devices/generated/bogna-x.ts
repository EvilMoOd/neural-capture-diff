import type { Device } from '../../../types'

export const bognaX: Device = {
  id: 'bogna-x',
  name: 'Bogna X',
  note: "Raw Capture from Bogna X 101B Ch.2 made by Tuomas Wäinölä at Sunbeam Studio.",
  captures: [
    {
      id: 1,
      name: 'Sunbeam Bogna X Ch2',
      params: {
        Volume: 10,
        Treble: 5,
        Middle: 5,
        Bass: 5,
        Gain: 2,
        'Boost Gain': 'Low',
        'Pre EQ': 'B1',
      },
    },
    {
      id: 2,
      name: "TW's Bogna X Ch1",
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
      id: 3,
      name: "TW's Bogna X Ch2",
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
      id: 4,
      name: "TW's Bogna X Ch3",
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
    {
      id: 5,
      name: 'Sunbeam Bogna X Ch3',
      params: {
      },
    },
  ],
}
