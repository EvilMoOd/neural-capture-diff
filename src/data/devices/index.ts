import type { Device } from '../../types'
import { deviceCategories } from '../categories'
import { generatedDevices } from './generated'

/** 爬取分组时去掉了撇号，这里恢复原始显示名 */
const nameOverrides: Record<string, string> = {
  'CA John Ch1': "CA John's Ch1",
  'CA John Ch2': "CA John's Ch2",
  'CA John Ch3': "CA John's Ch3",
}

export const devices: Device[] = generatedDevices.map((device) => {
  const info = deviceCategories[device.name]
  return {
    ...device,
    name: nameOverrides[device.name] ?? device.name,
    ...info,
  }
})
