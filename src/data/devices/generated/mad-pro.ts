import type { Device } from '../../../types'

export const madPro: Device = {
  id: 'mad-pro',
  name: 'Mad Pro',
  note: "Raw Capture from MadPro custom amplifier Ch.1 made by Tuomas Wäinölä at Sunbeam Imperial Studio.",
  captures: [
    {
      id: 1,
      name: "TW's MadPro 1",
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
      name: "TW's MadPro 2",
      params: {
        Gain: 6.5,
        Bass: 5,
        Middle: 3.5,
        Treble: 6.5,
        Master: 6,
      },
    },
    {
      id: 3,
      name: 'Sunbeam MadPro Ch2',
      params: {
      },
    },
    {
      id: 4,
      name: "TW's MadPro 2 w Juhl BB",
      params: {
      },
    },
    {
      id: 5,
      name: "TW's MadPro 2 w Juhl HB",
      params: {
      },
    },
  ],
}
