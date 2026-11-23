<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Device } from '../types'
import { categoryOrder } from '../data/categories'

const props = defineProps<{
  devices: Device[]
  selectedId: string
}>()

defineEmits<{
  select: [id: string]
}>()

const query = ref('')

const STORAGE_KEY = 'nc-device:pinned'

function readPinned(): string[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === 'string')
      : []
  } catch {
    return []
  }
}

const pinnedIds = ref<string[]>(readPinned())
const pinnedSet = computed(() => new Set(pinnedIds.value))

function isPinned(id: string) {
  return pinnedSet.value.has(id)
}

function togglePin(id: string) {
  pinnedIds.value = isPinned(id)
    ? pinnedIds.value.filter((pinnedId) => pinnedId !== id)
    : [...pinnedIds.value, id]
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pinnedIds.value))
  } catch {
    // localStorage 不可用时仅本次会话生效
  }
}

const filteredDevices = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return props.devices
  return props.devices.filter((device) => device.name.toLowerCase().includes(q))
})

const groups = computed(() => {
  const pinned = pinnedIds.value
    .map((id) => filteredDevices.value.find((device) => device.id === id))
    .filter((device): device is Device => device !== undefined)
  const pinnedInView = new Set(pinned.map((device) => device.id))

  const map = new Map<string, Device[]>()
  for (const device of filteredDevices.value) {
    if (pinnedInView.has(device.id)) continue
    const category = device.category ?? '未分类'
    const list = map.get(category)
    if (list) list.push(device)
    else map.set(category, [device])
  }
  const order = categoryOrder as readonly string[]
  const result = [...map.entries()]
    .map(([category, devices]) => ({ category, devices }))
    .sort((a, b) => {
      const ia = order.indexOf(a.category)
      const ib = order.indexOf(b.category)
      return (ia === -1 ? order.length : ia) - (ib === -1 ? order.length : ib)
    })
  if (pinned.length > 0) result.unshift({ category: '常用', devices: pinned })
  return result
})
</script>

<template>
  <div class="device-list">
    <input
      v-model="query"
      type="search"
      class="search"
      placeholder="搜索设备"
      aria-label="搜索设备"
    />
    <nav>
      <div v-for="group in groups" :key="group.category" class="group">
        <p class="group-title">
          <span>{{ group.category }}</span>
          <span class="group-count">{{ group.devices.length }}</span>
        </p>
        <ul>
          <li v-for="device in group.devices" :key="device.id" class="device-row">
            <button
              type="button"
              class="device-item"
              :class="{ active: device.id === selectedId }"
              @click="$emit('select', device.id)"
            >
              <span class="device-name">{{ device.name }}</span>
              <span class="device-meta">
                <template v-if="device.brand">{{ device.brand }} · </template>
                <template v-if="device.captures.length">{{ device.captures.length }} 个快照</template>
                <template v-else>无参数</template>
              </span>
            </button>
            <button
              type="button"
              class="pin-btn"
              :class="{ pinned: isPinned(device.id) }"
              :aria-label="isPinned(device.id) ? '取消置顶' : '置顶'"
              :aria-pressed="isPinned(device.id)"
              :title="isPinned(device.id) ? '取消置顶' : '置顶'"
              @click="togglePin(device.id)"
            >
              {{ isPinned(device.id) ? '★' : '☆' }}
            </button>
          </li>
        </ul>
      </div>
      <p v-if="groups.length === 0" class="no-result">无匹配设备</p>
    </nav>
  </div>
</template>

<style scoped>
.device-list {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.search {
  width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg);
  color: var(--text-h);
  font: inherit;
  font-size: 14px;
  outline: none;
}

.search:focus {
  border-color: var(--accent-border);
}

.device-list nav {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}

.group + .group {
  margin-top: 12px;
}

.group-title {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 0 0 4px;
  padding: 6px 12px 4px;
  background: var(--bg);
  font-size: 12px;
  font-weight: 600;
  color: var(--text);
}

.group-count {
  font-weight: 400;
  opacity: 0.7;
}

.device-list ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.device-row {
  position: relative;
}

.device-item {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 40px 10px 12px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: transparent;
  color: var(--text);
  text-align: left;
  font: inherit;
  cursor: pointer;
  transition:
    background 0.2s,
    border-color 0.2s;
}

.pin-btn {
  position: absolute;
  top: 6px;
  right: 4px;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--text);
  font-size: 16px;
  line-height: 1;
  opacity: 0.45;
  cursor: pointer;
}

.pin-btn:hover {
  background: var(--code-bg);
  opacity: 1;
}

.pin-btn.pinned {
  color: var(--accent);
  opacity: 1;
}

.device-item:hover {
  background: var(--code-bg);
}

.device-item.active {
  background: var(--accent-bg);
  border-color: var(--accent-border);
}

.device-name {
  color: var(--text-h);
  font-size: 15px;
  font-weight: 500;
}

.device-item.active .device-name {
  color: var(--accent);
}

.device-meta {
  font-size: 13px;
  color: var(--text);
}

.no-result {
  font-size: 13px;
  padding: 8px 12px;
}
</style>
