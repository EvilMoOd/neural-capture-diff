import type { Device } from '../../types'
import { deviceCategories } from '../categories'
import { generatedDevices } from './generated'

export const devices: Device[] = generatedDevices.map((device) => {
  const info = deviceCategories[device.name]
  return {
    ...device,
    ...info,
    // 官方清单之外的设备统一归入「未收录设备」
    ...(info ? {} : { category: '未收录设备' }),
  }
})
