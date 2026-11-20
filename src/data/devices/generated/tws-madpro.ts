import type { Device } from '../../../types'

export const twsMadpro: Device = {
  id: 'tws-madpro',
  name: "TW's MadPro",
  note: "Raw Capture from MadPro custom amplifier Ch.1 made by Tuomas Wäinölä at Sunbeam Imperial Studio.",
  captures: [
    {
      id: 1,
      params: {
        Gain: 6.5,
        Bass: 5,
        Middle: 3.5,
        Treble: 6,
        Master: 6.5,
      },
    },
    {
      id: 2,
      params: {
        Gain: 6.5,
        Bass: 5,
        Middle: 3.5,
        Treble: 6.5,
        Master: 6,
      },
    },
  ],
}
