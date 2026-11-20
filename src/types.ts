export interface Capture {
  /** 快照编号，编号 1 为对比基准 */
  id: number
  /** 快照名称（可选，未提供时只显示编号） */
  name?: string
  /** 参数名 -> 参数值 */
  params: Record<string, string | number>
}

export interface Device {
  id: string
  name: string
  brand?: string
  /** 设备分类，如 Guitar amps / Bass overdrive */
  category?: string
  /** 采样原型设备 */
  basedOn?: string
  /** 设备/capture 说明 */
  note?: string
  captures: Capture[]
}
