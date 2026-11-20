/**
 * 把 scripts/.cache/captures.json 转换成 src/data/devices/generated/ 下的设备文件。
 *
 * 用法：node scripts/build-devices.mjs
 *
 * 规则：
 * - 设备名 = capture 名称去掉末尾序号，并合并仅大小写/撇号不同的重复上传
 * - 快照序号 = 名称末尾数字；没有序号时记为 1
 * - 参数取描述里第一个 "Settings:" 区块（多段 Settings 的 capture 只取主设备段）
 * - "Settings: N/A"、空描述、非结构化描述会被跳过
 * - 值 N/A 视为缺失；On/Off 统一大小写；纯数字转为 number
 */
import fs from 'node:fs'
import path from 'node:path'

const CACHE_FILE = 'scripts/.cache/captures.json'
const OUT_DIR = 'src/data/devices/generated'

const cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'))
const items = cache.items.map((i) => i.search ?? {})

const groupOf = (name) => {
  const m = (name ?? '').match(/^(.*?)[\s#-]*(\d+)$/)
  return { base: m ? m[1].trim() : (name ?? '').trim(), num: m ? Number(m[2]) : 1 }
}
const normKey = (base) =>
  base.replace(/['‘’‛`]s\b/gi, '').replace(/['‘’‛`]/g, '').replace(/\s+/g, ' ').trim().toLowerCase()

function parseValue(raw) {
  const v = raw.trim()
  if (/^n\/a$/i.test(v)) return undefined
  if (/^(on|off)$/i.test(v)) return v[0].toUpperCase() + v.slice(1).toLowerCase()
  if (/^-?\d+(\.\d+)?$/.test(v)) return Number(v)
  return v
}

function parseSettings(lines, startIdx) {
  const params = {}
  const inline = lines[startIdx].replace(/^\s*Settings\s*:/i, '').trim()
  if (inline && !/^n\/a$/i.test(inline)) {
    const m = inline.match(/^([^:]+?):\s*(.+)$/)
    if (m) {
      const val = parseValue(m[2])
      if (val !== undefined) params[m[1].trim()] = val
    }
  }
  for (let i = startIdx + 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (/^Settings\s*:/i.test(line)) break // 只取第一段
    if (!line) continue
    const m = line.match(/^([^:]+?):\s*(.+)$/)
    if (!m) continue
    const val = parseValue(m[2])
    if (val !== undefined) params[m[1].trim()] = val
  }
  return Object.keys(params).length ? params : null
}

function parsePlugin(lines, startIdx) {
  let section = ''
  const params = {}
  for (let i = startIdx + 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue
    const kv = line.match(/^([^:]+?):\s*(.+)$/)
    if (kv) {
      const key = section ? `${section} ${kv[1].trim()}` : kv[1].trim()
      const val = parseValue(kv[2])
      if (val !== undefined) params[key] = val
    } else if (/^[^:]{1,40}:?\s*$/.test(line)) {
      section = line.replace(/:\s*$/, '').trim()
    }
  }
  return Object.keys(params).length ? params : null
}

function parseDescription(raw) {
  const lines = (raw ?? '').replace(/\r\n?/g, '\n').split('\n')
  const settingsIdx = lines.findIndex((l) => /^\s*Settings\s*:/.test(l))
  if (settingsIdx >= 0) return parseSettings(lines, settingsIdx)
  const pluginIdx = lines.findIndex((l) => /^\s*Captured\s+Device\s*:/i.test(l))
  if (pluginIdx >= 0) return parsePlugin(lines, pluginIdx)
  return null
}

function noteOf(raw) {
  const lines = (raw ?? '').replace(/\r\n?/g, '\n').split('\n')
  const idx = lines.findIndex((l) => /^\s*Settings\s*:/.test(l))
  const text = (idx >= 0 ? lines.slice(0, idx) : [lines[0]])
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
  return text || undefined
}

// 1. 分组
const groups = new Map()
for (const item of items) {
  const { base, num } = groupOf(item.name)
  const key = normKey(base)
  if (!groups.has(key)) groups.set(key, { key, bases: new Map(), entries: [] })
  const group = groups.get(key)
  group.bases.set(base, (group.bases.get(base) ?? 0) + 1)
  const params = parseDescription(item.description)
  group.entries.push({ num, base, params, note: noteOf(item.description), name: item.name })
}

// 2. 组装设备
const stats = { skippedGroups: [], grouped: 0, snapshots: 0 }
const devices = []
for (const group of groups.values()) {
  const parsed = group.entries.filter((e) => e.params)
  if (!parsed.length) {
    stats.skippedGroups.push([...group.bases.keys()].join(' / '))
    continue
  }
  // 展示名：优先取有解析结果的那批 capture 的名称前缀
  const baseCount = new Map()
  for (const e of parsed) baseCount.set(e.base, (baseCount.get(e.base) ?? 0) + 1)
  const name = [...baseCount.entries()].sort((a, b) => b[1] - a[1])[0][0]

  const byNum = new Map()
  for (const e of parsed) {
    const prev = byNum.get(e.num)
    if (!prev || Object.keys(e.params).length > Object.keys(prev.params).length) byNum.set(e.num, e)
  }
  const captures = [...byNum.values()]
    .sort((a, b) => a.num - b.num)
    .map((e) => ({ id: e.num, params: e.params }))

  const note = parsed.find((e) => e.note)?.note
  devices.push({ name, note, captures })
  stats.grouped++
  stats.snapshots += captures.length
}
devices.sort((a, b) => a.name.localeCompare(b.name))

// 3. 写文件
const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/['‘’‛`]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'device'
const q = (s) => (/^[A-Za-z0-9 _\-./®™+&()#%]+$/.test(s)
  ? `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
  : JSON.stringify(s))
const keyLiteral = (k) => (/^[A-Za-z_$][\w$]*$/.test(k) ? k : q(k))

fs.rmSync(OUT_DIR, { recursive: true, force: true })
fs.mkdirSync(OUT_DIR, { recursive: true })

const usedSlugs = new Set()
const exportsList = []
for (const device of devices) {
  let slug = slugify(device.name)
  let n = 2
  while (usedSlugs.has(slug)) slug = `${slugify(device.name)}-${n++}`
  usedSlugs.add(slug)
  const exportName = slug.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase()).replace(/^(\d)/, 'device$1')

  const lines = []
  lines.push("import type { Device } from '../../../types'")
  lines.push('')
  lines.push(`export const ${exportName}: Device = {`)
  lines.push(`  id: ${q(slug)},`)
  lines.push(`  name: ${q(device.name)},`)
  if (device.note) lines.push(`  note: ${q(device.note)},`)
  lines.push('  captures: [')
  for (const capture of device.captures) {
    lines.push('    {')
    lines.push(`      id: ${capture.id},`)
    lines.push('      params: {')
    for (const [k, v] of Object.entries(capture.params)) {
      lines.push(`        ${keyLiteral(k)}: ${typeof v === 'number' ? v : q(v)},`)
    }
    lines.push('      },')
    lines.push('    },')
  }
  lines.push('  ],')
  lines.push('}')
  lines.push('')

  fs.writeFileSync(path.join(OUT_DIR, `${slug}.ts`), lines.join('\n'))
  exportsList.push({ exportName, slug })
}

const indexLines = ["import type { Device } from '../../../types'"]
for (const { exportName, slug } of exportsList) {
  indexLines.push(`import { ${exportName} } from './${slug}'`)
}
indexLines.push('')
indexLines.push('export const generatedDevices: Device[] = [')
for (const { exportName } of exportsList) indexLines.push(`  ${exportName},`)
indexLines.push(']')
indexLines.push('')
fs.writeFileSync(path.join(OUT_DIR, 'index.ts'), indexLines.join('\n'))

console.log(`设备：${stats.grouped}，快照：${stats.snapshots}`)
console.log(`跳过（无可解析 Settings）：${stats.skippedGroups.length}`)
for (const name of stats.skippedGroups) console.log('  -', name)
console.log(`输出目录：${OUT_DIR}`)
