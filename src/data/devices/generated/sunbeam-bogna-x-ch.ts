import type { Device } from '../../../types'

export const sunbeamBognaXCh: Device = {
  id: 'sunbeam-bogna-x-ch',
  name: 'Sunbeam Bogna X Ch',
  note: "Full rig Capture from Bogna X 101B Ch.2 with Bogna X 4x12 cabinet mic’d with multiple mics and mixed by Tuomas Wäinölä at Sunbeam Imperial Studio.",
  captures: [
    {
      id: 2,
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
  ],
}
