import type { Device } from '../../../types'

export const caMixbass1Amp: Device = {
  id: 'ca-mixbass-1-amp',
  name: 'CA MixBass 1 Amp',
  note: 'Quad Cortex Factory Captures This is a capture of Mesa Boogie® Big Block 750® amp.',
  captures: [
    {
      id: 1,
      params: {
        Amp: 'Big Block 750®',
        Channel: 1,
        'Active/Passive': 'Active',
        Gain: 7,
        Bass: 7,
        'Passive-Mid': 6,
        'Active-Mid': 10,
        Frequency: 10,
        Treble: 6.5,
        Master: 2.5,
        Pedal1: 'Douglas® Hyper Luminal®',
        'Compress Mode': 'Fet',
        Ratio: "4:1",
        Blend: 2.5,
        Time: 8.5,
        Output: 3.5,
        Compression: 3.5,
        Pedal2: 'Douglas® B3K®',
        'Attack Mode': 'Boost',
        Grunt: 'Fat',
        Level: 6,
        Drive: 2.5,
      },
    },
  ],
}
