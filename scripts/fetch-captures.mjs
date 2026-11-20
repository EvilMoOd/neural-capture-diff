/**
 * 抓取 Neural DSP Cloud 上某个用户的 neural capture 列表。
 *
 * 用法：
 *   1. 登录 https://cloud.neuraldsp.com ，从 DevTools 取 localStorage 的
 *      ndsp_access_token，保存到 ~/.ndsp_token（或通过 NDSP_TOKEN 环境变量传入）
 *   2. node scripts/fetch-captures.mjs
 *
 * 输出：scripts/.cache/captures.json（列表响应已含 description，构建设备数据够用，
 * 无需再逐个请求详情）
 */
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const BASE = 'https://cloud-api.neuraldsp.com'
const USERNAME = process.env.NDSP_USER ?? 'NeuralDSP'
const PAGE_SIZE = 50
const REQUEST_DELAY_MS = 400
const CACHE_DIR = path.resolve('scripts/.cache')
const CACHE_FILE = path.join(CACHE_DIR, 'captures.json')

function readToken() {
  if (process.env.NDSP_TOKEN) return process.env.NDSP_TOKEN.trim()
  const tokenFile = path.join(os.homedir(), '.ndsp_token')
  try {
    return fs.readFileSync(tokenFile, 'utf8').trim()
  } catch {
    console.error(`未找到 token：请把 ndsp_access_token 写入 ${tokenFile}`)
    process.exit(1)
  }
}

const TOKEN = readToken()
const HEADERS = {
  accept: 'application/json',
  authorization: `Bearer ${TOKEN}`,
  'x-cloud-api-client-type': 'web-cloud',
  'x-cloud-api-client-version': '1.0.0',
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function getJson(url, attempt = 1) {
  const res = await fetch(url, { headers: HEADERS })
  if (res.status === 401) {
    console.error('token 无效或已过期，请重新登录后更新 ~/.ndsp_token')
    process.exit(1)
  }
  if (res.status === 429 || res.status >= 500) {
    if (attempt <= 3) {
      const wait = 2000 * attempt
      console.warn(`  ${res.status}，${wait}ms 后重试…`)
      await sleep(wait)
      return getJson(url, attempt + 1)
    }
  }
  if (!res.ok) {
    throw new Error(`GET ${url} -> ${res.status} ${await res.text()}`)
  }
  return res.json()
}

async function fetchCaptureList() {
  const items = []
  const params = new URLSearchParams({
    ownedBy: USERNAME,
    query: '',
    sort: 'relevance',
    sortDir: 'descending',
    size: String(PAGE_SIZE),
  })
  for (let page = 0; page < 200; page++) {
    params.set('page', String(page))
    const url = `${BASE}/search/v1/for/neuralCapture?${params}`
    const body = await getJson(url)
    const data = body.data ?? []
    console.log(`第 ${page + 1} 页：${data.length} 条（共 ${body.numberOfResults ?? '?'} 条）`)
    items.push(...data)
    if (data.length === 0 || page + 1 >= (body.numberOfPages ?? 1)) break
    await sleep(REQUEST_DELAY_MS)
  }
  return items
}

function loadCache() {
  try {
    return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'))
  } catch {
    return { username: USERNAME, fetchedAt: null, items: [] }
  }
}

function saveCache(cache) {
  fs.mkdirSync(CACHE_DIR, { recursive: true })
  cache.fetchedAt = new Date().toISOString()
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2))
}

async function main() {
  const cache = loadCache()
  console.log(`拉取 ${USERNAME} 的 capture 列表…`)
  const list = await fetchCaptureList()

  const known = new Map(cache.items.map((item) => [item.id, item]))
  const result = []
  for (const entry of list) {
    const id = entry.id ?? entry.productId ?? entry.product_id
    const cached = known.get(id)
    result.push({ ...(cached ?? {}), id, search: entry })
  }
  saveCache({ ...cache, username: USERNAME, items: result })

  console.log(`完成：${result.length} 个 capture -> ${CACHE_FILE}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
