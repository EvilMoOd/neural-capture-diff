import type { Device } from '../../../types'

export const reusBenderMk2: Device = {
  id: 'reus-bender-mk2',
  name: 'Reus Bender Mk2',
  note: "Captured Device: Reuss Musical Instruments® Germanium Bender®",
  captures: [
    {
      id: 1,
      params: {
        Attack: 10,
        Level: 10,
        'QC Input impedance': '1M',
      },
    },
    {
      id: 2,
      params: {
        Attack: 10,
        Level: 10,
        'QC Input impedance': '1M',
      },
    },
    {
      id: 3,
      params: {
        Attack: 5,
        Level: 10,
        'QC Input impedance': '1M',
      },
    },
    {
      id: 4,
      params: {
        Attack: 0,
        Level: 10,
        'QC Input impedance': '1M',
      },
    },
  ],
}
