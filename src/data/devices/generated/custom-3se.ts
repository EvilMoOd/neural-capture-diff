import type { Device } from '../../../types'

export const custom3se: Device = {
  id: 'custom-3se',
  name: 'Custom 3SE',
  note: 'Quad Cortex Factory Captures This is a capture of Custom Audio Amplifiers® 3+SE® preamp',
  captures: [
    {
      id: 1,
      params: {
        Channel: '3 Lead',
        Bright: 'On',
        Gain: 1,
        Bass: 4.5,
        Middle: 4,
        Treble: 6.5,
        Master: 5,
        Pedal1: 'Xotic Effects® BB Preamp®',
        Volume: 5,
      },
    },
    {
      id: 2,
      params: {
        Channel: '3 Lead',
        Bright: 'On',
        Gain: 3,
        Bass: 5,
        Middle: 5,
        Treble: 5,
        Master: 5,
      },
    },
    {
      id: 3,
      params: {
        Channel: '2 Crunch',
        Bright: 'On',
        Gain: 1,
        Bass: 4.5,
        Middle: 7,
        Treble: 6.5,
        Master: 5,
        Pedal1: 'Xotic Effects® BB Preamp®',
        Volume: 5,
      },
    },
    {
      id: 4,
      params: {
        Channel: '2 Crunch',
        Bright: 'On',
        Gain: 3,
        Bass: 4,
        Middle: 8,
        Treble: 8,
        Master: 5,
      },
    },
    {
      id: 5,
      params: {
        Channel: '2 Crunch',
        Bright: 'On',
        Gain: 1.5,
        Bass: 5,
        Middle: 5.5,
        Treble: 10,
        Master: 5,
      },
    },
    {
      id: 6,
      params: {
        Channel: '1 Clean',
        Bright: 'On',
        Gain: 2,
        Bass: 5,
        Middle: 6,
        Treble: 5,
        Master: 5,
      },
    },
    {
      id: 7,
      params: {
        Channel: '1 Clean',
        Bright: 'Off',
        Gain: 2,
        Bass: 6,
        Middle: 10,
        Treble: 3,
        Master: 5,
      },
    },
    {
      id: 8,
      params: {
        Channel: '1 Clean',
        Bright: 'On',
        Gain: 10,
        Bass: 3,
        Middle: 4,
        Treble: 7,
        Master: 5,
      },
    },
  ],
}
