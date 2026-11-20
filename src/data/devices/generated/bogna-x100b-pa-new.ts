import type { Device } from '../../../types'

export const bognaX100bPaNew: Device = {
  id: 'bogna-x100b-pa-new',
  name: 'Bogna X100B PA NEW',
  note: "Quad Cortex Factory Captures This is a capture of Bogner® Ecstasy® 100B® amp’s power amp section with EL34 tubes.",
  captures: [
    {
      id: 1,
      params: {
        Presence: 3.5,
        'Master Volume': 10,
        Excursion: 'Tight',
        Variac: 'Off',
        Style: 'New',
      },
    },
    {
      id: 2,
      params: {
        Presence: 3.5,
        'Master Volume': 6.5,
        Excursion: 'Tight',
        Variac: 'Off',
        Style: 'New',
      },
    },
    {
      id: 3,
      params: {
        Presence: 3.5,
        'Master Volume': 3.5,
        Excursion: 'Tight',
        Variac: 'Off',
        Style: 'New',
      },
    },
  ],
}
