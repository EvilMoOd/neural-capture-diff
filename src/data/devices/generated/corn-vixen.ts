import type { Device } from '../../../types'

export const cornVixen: Device = {
  id: 'corn-vixen',
  name: 'Corn Vixen',
  note: 'Quad Cortex Factory Captures This is a capture of Cornford® Hellcat® amp.',
  captures: [
    {
      id: 1,
      params: {
        Channel: 'Modern',
        'Modern CH.1': 10,
        Bass: 7,
        Middle: 8,
        Treble: 7,
        'Master CH.1': 6,
      },
    },
    {
      id: 2,
      params: {
        Channel: 'Vintage',
        'Vintage CH.2': 5,
        Bass: 7,
        Middle: 3.5,
        Treble: 7,
        'Master CH.2': 6.5,
      },
    },
    {
      id: 3,
      params: {
        Channel: 'Vintage',
        'Vintage CH.2': 8,
        Bass: 7,
        Middle: 3.5,
        Treble: 7,
        'Master CH.2': 6.5,
      },
    },
    {
      id: 4,
      params: {
        Channel: 'Vintage',
        'Vintage CH.2': 10,
        Bass: 7,
        Middle: 3.5,
        Treble: 7,
        'Master CH.2': 6.5,
      },
    },
  ],
}
