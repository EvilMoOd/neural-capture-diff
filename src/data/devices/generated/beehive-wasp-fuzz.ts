import type { Device } from '../../../types'

export const beehiveWaspFuzz: Device = {
  id: 'beehive-wasp-fuzz',
  name: 'Beehive Wasp Fuzz',
  note: "Captured Device: Beetronics® Vezzpa® Octave Stinger™",
  captures: [
    {
      id: 1,
      params: {
        Sustain: 10,
        Volume: 10,
        Mode: 'Fuzzzz',
      },
    },
    {
      id: 2,
      params: {
        Sustain: 10,
        Volume: 6,
        Mode: 'Fuzzzz',
      },
    },
    {
      id: 3,
      params: {
        Sustain: 10,
        Volume: 3,
        Mode: 'Fuzzzz',
      },
    },
    {
      id: 4,
      params: {
        Sustain: 10,
        Volume: 10,
        Mode: 'Stinger',
      },
    },
    {
      id: 5,
      params: {
        Sustain: 10,
        Volume: 4,
        Mode: 'Stinger',
      },
    },
    {
      id: 6,
      params: {
        Sustain: 10,
        Volume: 2,
        Mode: 'Stinger',
      },
    },
  ],
}
