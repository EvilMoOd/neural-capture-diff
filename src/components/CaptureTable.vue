<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Capture, Device } from '../types'

const props = defineProps<{
  device: Device
}>()

const captures = computed(() =>
  [...props.device.captures].sort((a, b) => a.id - b.id),
)

/** 用户手动选择的基准快照；为空时默认 #1，没有 #1 则取第一个 */
const baselineId = ref<number | null>(null)

watch(
  () => props.device.id,
  () => {
    baselineId.value = null
  },
)

const baseline = computed(() => {
  const list = captures.value
  return (
    list.find((capture) => capture.id === baselineId.value) ??
    list.find((capture) => capture.id === 1) ??
    list[0]
  )
})

function setBaseline(capture: Capture) {
  baselineId.value = capture.id
}

/** 所有快照参数的并集，按首次出现顺序排列 */
const paramKeys = computed(() => {
  const keys: string[] = []
  for (const capture of captures.value) {
    for (const key of Object.keys(capture.params)) {
      if (!keys.includes(key)) keys.push(key)
    }
  }
  return keys
})

function isSameValue(a: string | number | undefined, b: string | number | undefined) {
  if (a === undefined || b === undefined) return a === b
  if (typeof a === 'number' && typeof b === 'number') return Math.abs(a - b) < 1e-6
  return String(a).trim() === String(b).trim()
}

/** 非基准快照中，与基准不同的参数单元格 */
function isDiff(capture: Capture, key: string) {
  if (capture.id === baseline.value?.id) return false
  return !isSameValue(capture.params[key], baseline.value?.params[key])
}

function isMissing(capture: Capture, key: string) {
  return capture.params[key] === undefined
}
</script>

<template>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th class="sticky-col">快照</th>
          <th v-for="key in paramKeys" :key="key">{{ key }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="capture in captures"
          :key="capture.id"
          :class="{ baseline: capture.id === baseline?.id }"
        >
          <th class="sticky-col snapshot">
            <button
              type="button"
              class="snapshot-btn"
              :title="capture.id === baseline?.id ? '当前基准快照' : '设为基准快照'"
              @click="setBaseline(capture)"
            >
              <span class="snapshot-id">#{{ capture.id }}</span>
              <span v-if="capture.name" class="snapshot-name">{{ capture.name }}</span>
              <span v-if="capture.id === baseline?.id" class="baseline-tag">基准</span>
            </button>
          </th>
          <td
            v-for="key in paramKeys"
            :key="key"
            :class="{ diff: isDiff(capture, key), missing: isMissing(capture, key) }"
          >
            {{ isMissing(capture, key) ? '—' : capture.params[key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-wrap {
  flex: 1;
  min-height: 0;
  overflow: auto;
  border: 1px solid var(--border);
  border-radius: 10px;
  -webkit-overflow-scrolling: touch;
}

table {
  border-collapse: separate;
  border-spacing: 0;
  min-width: 100%;
  font-size: 14px;
}

th,
td {
  padding: 10px 16px;
  white-space: nowrap;
  border-bottom: 1px solid var(--border);
  text-align: right;
}

thead th {
  position: sticky;
  top: 0;
  z-index: 2;
  background: var(--bg);
  color: var(--text);
  font-weight: 500;
  font-size: 13px;
}

tbody tr:last-child th,
tbody tr:last-child td {
  border-bottom: none;
}

tbody tr:hover td:not(.diff),
tbody tr:hover th.snapshot {
  background: var(--code-bg);
}

.sticky-col {
  position: sticky;
  left: 0;
  z-index: 1;
  text-align: left;
  background: var(--bg);
}

thead .sticky-col {
  z-index: 3;
}

.snapshot {
  font-weight: 400;
}

.snapshot-btn {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0;
  border: none;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  white-space: nowrap;
  cursor: pointer;
}

.snapshot-btn:hover .snapshot-id {
  text-decoration: underline;
}

.snapshot-id {
  margin-right: 8px;
  font-family: var(--mono);
  font-size: 13px;
  color: var(--accent);
}

.snapshot-name {
  color: var(--text-h);
}

.baseline-tag {
  margin-left: 8px;
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 12px;
  line-height: 16px;
  color: var(--accent);
  background: var(--accent-bg);
}

td.diff {
  color: var(--accent);
  font-weight: 600;
  background: var(--accent-bg);
}

td.missing:not(.diff) {
  color: var(--text);
  opacity: 0.6;
}

@media (max-width: 768px) {
  .table-wrap {
    border-radius: 8px;
  }

  table {
    font-size: 13px;
  }

  th,
  td {
    padding: 8px 10px;
  }

  thead th {
    font-size: 12px;
  }

  .snapshot-id {
    margin-right: 6px;
    font-size: 12px;
  }

  .baseline-tag {
    margin-left: 6px;
  }
}
</style>
