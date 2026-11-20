import type { Device } from '../../../types'

export const ibaBasicFuzz: Device = {
  id: 'iba-basic-fuzz',
  name: 'Iba Basic Fuzz',
  note: "Captured Device: Ibanez® No. 59 Standard Fuzz®",
  captures: [
    {
      id: 1,
      params: {
        Balance: 10,
      },
    },
    {
      id: 2,
      params: {
        Balance: 10,
      },
    },
  ],
}
