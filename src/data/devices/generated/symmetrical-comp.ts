import type { Device } from '../../../types'

export const symmetricalComp: Device = {
  id: 'symmetrical-comp',
  name: 'Symmetrical Comp',
  note: "Captured Device: Douglas® Super Symmetry® 115 GeV",
  captures: [
    {
      id: 1,
      params: {
        Blend: '100%',
        Input: 7,
        Compression: 9,
        Output: 6,
        Attack: 0,
        Release: 0,
      },
    },
    {
      id: 2,
      params: {
        Blend: '100%',
        Input: 8,
        Compression: 9,
        Output: 6,
        Attack: 0,
        Release: 7,
      },
    },
    {
      id: 3,
      params: {
        Blend: '100%',
        Input: 8,
        Compression: 9,
        Output: 6,
        Attack: 0,
        Release: 10,
      },
    },
    {
      id: 4,
      params: {
        Blend: '100%',
        Input: 8,
        Compression: 9,
        Output: 6,
        Attack: 6,
        Release: 0,
      },
    },
    {
      id: 5,
      params: {
        Blend: '100%',
        Input: 8,
        Compression: 9,
        Output: 6,
        Attack: 6,
        Release: 6,
      },
    },
    {
      id: 6,
      params: {
        Blend: '100%',
        Input: 8,
        Compression: 9,
        Output: 6,
        Attack: 6,
        Release: 10,
      },
    },
    {
      id: 7,
      params: {
        Blend: '100%',
        Input: 8,
        Compression: 9,
        Output: 6,
        Attack: 10,
        Release: 0,
      },
    },
  ],
}
