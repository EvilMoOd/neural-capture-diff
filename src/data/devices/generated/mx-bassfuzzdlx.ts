import type { Device } from '../../../types'

export const mxBassfuzzdlx: Device = {
  id: 'mx-bassfuzzdlx',
  name: 'MX BassFuzzDLX',
  note: 'Quad Cortex Factory Captures This is a capture of MXR® Bass Fuzz Deluxe® pedal.',
  captures: [
    {
      id: 1,
      params: {
        Dry: 0,
        Wet: 10,
        Tone: 7.5,
        Fuzz: 1.5,
      },
    },
    {
      id: 2,
      params: {
        Dry: 0,
        Wet: 10,
        Tone: 7.5,
        Fuzz: 3,
      },
    },
    {
      id: 3,
      params: {
        Dry: 0,
        Wet: 10,
        Tone: 7.5,
        Fuzz: 10,
      },
    },
    {
      id: 4,
      params: {
        Dry: 0,
        Wet: 10,
        Tone: 10,
        Fuzz: 2,
        Ped2: "Ibanez® TS9®, pre MXR®",
        Drive: 0,
        Level: 5,
        Ped3: "Boss® GE-7®, post MXR®",
        '100Hz': -7,
        '200Hz': -15,
        '400Hz': 0,
        '800Hz': 0,
        '1.6kHz': 0,
        '3.2kHz': -6,
        '6.4kHz': -15,
      },
    },
  ],
}
