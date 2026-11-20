<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { devices } from './data/devices'
import DeviceList from './components/DeviceList.vue'
import CaptureTable from './components/CaptureTable.vue'

type PayMethod = 'alipay' | 'wechat'

const selectedId = ref(devices[0]?.id ?? '')
const sidebarOpen = ref(false)
const sidebarCollapsed = ref(false)
const donateOpen = ref(false)
const payMethod = ref<PayMethod>('wechat')
const qrFailed = ref<Record<PayMethod, boolean>>({ alipay: false, wechat: false })

const qrImages: Record<PayMethod, string> = {
  alipay: `${import.meta.env.BASE_URL}alipay-qr.webp`,
  wechat: `${import.meta.env.BASE_URL}wechat-qr.webp`,
}

const qrPaths: Record<PayMethod, string> = {
  alipay: 'public/alipay-qr.webp',
  wechat: 'public/wechat-qr.webp',
}

function markQrFailed(method: PayMethod) {
  qrFailed.value[method] = true
}
const selectedDevice = computed(
  () => devices.find((device) => device.id === selectedId.value) ?? null,
)

function selectDevice(id: string) {
  selectedId.value = id
  sidebarOpen.value = false
}

/** 手机端「收起」= 关闭抽屉；桌面端才真正收起侧边栏 */
function collapseSidebar() {
  if (sidebarOpen.value) sidebarOpen.value = false
  else sidebarCollapsed.value = true
}

function onKeydown(event: KeyboardEvent) {
  if (event.key !== 'Escape') return
  if (donateOpen.value) donateOpen.value = false
  else if (sidebarOpen.value) sidebarOpen.value = false
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div class="layout">
    <div class="app">
      <div
        v-if="sidebarOpen"
        class="backdrop"
        aria-hidden="true"
        @click="sidebarOpen = false"
      />
      <aside class="sidebar" :class="{ open: sidebarOpen, collapsed: sidebarCollapsed }">
        <header class="brand">
          <div class="brand-row">
            <div>
              <h1>NC Device</h1>
              <p>Neural DSP Capture 参数一览</p>
            </div>
            <button
              type="button"
              class="collapse-btn"
              title="收起侧边栏"
              aria-label="收起侧边栏"
              @click="collapseSidebar"
            >
              «
            </button>
          </div>
        </header>
        <DeviceList
          :devices="devices"
          :selected-id="selectedId"
          @select="selectDevice"
        />
      </aside>

      <main class="content">
        <div class="mobile-bar">
          <button type="button" class="menu-btn" @click="sidebarOpen = true">
            ☰ 设备列表
          </button>
        </div>
        <div v-if="sidebarCollapsed" class="expand-bar">
          <button type="button" class="menu-btn" @click="sidebarCollapsed = false">
            ☰ 展开菜单
          </button>
        </div>
        <template v-if="selectedDevice">
          <header class="device-header">
            <h2>{{ selectedDevice.name }}</h2>
            <p class="meta">
              <template v-if="selectedDevice.category">{{ selectedDevice.category }} · </template>
              <template v-if="selectedDevice.brand">{{ selectedDevice.brand }} · </template>
              {{ selectedDevice.captures.length }} 个快照 · 点击快照编号可切换基准
            </p>
            <p v-if="selectedDevice.basedOn" class="based-on">基于 {{ selectedDevice.basedOn }}</p>
            <p v-if="selectedDevice.note" class="note">{{ selectedDevice.note }}</p>
          </header>
          <CaptureTable :device="selectedDevice" />
        </template>
        <p v-else class="empty">暂无设备数据</p>
      </main>
    </div>

    <footer class="site-footer">
      <button type="button" class="donate-btn" @click="donateOpen = true">
        给大佬买杯奶茶
      </button>
      <p class="footer-line">
        本页面由 ©EvilMoOd 基于 Neural DSP 设备数据进行二次开发，完全开源免费，禁止用于商业用途，违者将依法追究法律责任。
      </p>
    </footer>

    <div v-if="donateOpen" class="modal-backdrop" @click.self="donateOpen = false">
      <div
        class="donate-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="donate-title"
      >
        <button
          type="button"
          class="modal-close"
          aria-label="关闭"
          @click="donateOpen = false"
        >
          ×
        </button>
        <h3 id="donate-title">给大佬买杯奶茶</h3>
        <div class="pay-tabs" role="tablist" aria-label="收款方式">
          <button
            type="button"
            role="tab"
            class="pay-tab"
            :class="{ active: payMethod === 'wechat' }"
            :aria-selected="payMethod === 'wechat'"
            @click="payMethod = 'wechat'"
          >
            微信
          </button>
          <button
            type="button"
            role="tab"
            class="pay-tab"
            :class="{ active: payMethod === 'alipay' }"
            :aria-selected="payMethod === 'alipay'"
            @click="payMethod = 'alipay'"
          >
            支付宝
          </button>
        </div>
        <img
          v-if="!qrFailed[payMethod]"
          :src="qrImages[payMethod]"
          :alt="`${payMethod === 'alipay' ? '支付宝' : '微信'}收款码`"
          class="qr-img"
          @error="markQrFailed(payMethod)"
        />
        <div v-else class="qr-placeholder">
          <span>收款码待上传</span>
          <code>{{ qrPaths[payMethod] }}</code>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100svh;
  height: 100dvh;
}

.app {
  flex: 1;
  min-height: 0;
  display: flex;
  text-align: left;
}

.sidebar {
  width: 260px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px 16px;
  border-right: 1px solid var(--border);
  overflow: hidden;
  transition:
    width 0.2s ease,
    padding 0.2s ease;
}

.brand-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

.collapse-btn {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: transparent;
  color: var(--text);
  font: inherit;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
}

.collapse-btn:hover {
  background: var(--code-bg);
}

.brand h1 {
  font-size: 20px;
  margin: 0 0 4px;
}

.brand p {
  font-size: 13px;
}

.content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  padding: 24px 32px 16px;
  overflow: hidden;
}

.device-header {
  flex-shrink: 0;
  margin-bottom: 16px;
}

.device-header h2 {
  margin: 0 0 4px;
}

.meta {
  font-size: 14px;
}

.based-on {
  margin-top: 4px;
  font-size: 14px;
}

.note {
  margin-top: 4px;
  font-size: 14px;
}

.site-footer {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 10px 16px;
  border-top: 1px solid var(--border);
  background: var(--bg);
  font-size: 13px;
  text-align: center;
}

.site-footer p {
  margin: 0;
}

.footer-line {
  line-height: 1.6;
}

.donate-btn {
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border: 1px solid var(--accent-border);
  border-radius: 999px;
  background: var(--accent-bg);
  color: var(--accent);
  font: inherit;
  font-size: 12px;
  line-height: 18px;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
}

.donate-btn:hover {
  border-color: var(--accent);
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgb(0 0 0 / 0.5);
}

.donate-modal {
  position: relative;
  width: min(320px, 100%);
  max-height: calc(100dvh - 32px);
  overflow: auto;
  padding: 24px;
  border-radius: 12px;
  background: var(--bg);
  box-shadow: var(--shadow);
  text-align: center;
}

.donate-modal h3 {
  margin: 0 0 16px;
  color: var(--text-h);
  font-size: 17px;
  font-weight: 500;
}

.pay-tabs {
  display: flex;
  gap: 4px;
  padding: 4px;
  margin-bottom: 16px;
  border-radius: 999px;
  background: var(--code-bg);
}

.pay-tab {
  flex: 1;
  padding: 6px 12px;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: var(--text);
  font: inherit;
  font-size: 13px;
  cursor: pointer;
}

.pay-tab.active {
  background: var(--bg);
  color: var(--accent);
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.12);
}

.qr-img {
  display: block;
  width: 220px;
  max-width: 100%;
  margin: 0 auto;
  border-radius: 8px;
}

.qr-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 220px;
  height: 220px;
  max-width: 100%;
  margin: 0 auto;
  border: 1px dashed var(--border);
  border-radius: 8px;
  font-size: 14px;
}

.qr-placeholder code {
  padding: 0;
  background: transparent;
  font-size: 12px;
  color: var(--text);
}

.modal-close {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--text);
  font: inherit;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
}

.modal-close:hover {
  background: var(--code-bg);
}

.backdrop {
  display: none;
}

.mobile-bar,
.expand-bar {
  display: none;
}

.menu-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: transparent;
  color: var(--text-h);
  font: inherit;
  font-size: 14px;
  cursor: pointer;
}

.menu-btn:active {
  background: var(--code-bg);
}

.empty {
  color: var(--text);
}

@media (min-width: 769px) {
  .sidebar.collapsed {
    width: 0;
    padding-left: 0;
    padding-right: 0;
    border-right: none;
  }

  .expand-bar {
    display: flex;
    flex-shrink: 0;
    margin-bottom: 12px;
  }
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 30;
    width: min(86vw, 320px);
    height: 100dvh;
    padding: 16px;
    border-right: 1px solid var(--border);
    background: var(--bg);
    transform: translateX(-100%);
    transition: transform 0.25s ease;
    overflow: hidden;
  }

  .sidebar.open {
    transform: none;
  }

  .backdrop {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 20;
    background: rgb(0 0 0 / 0.4);
    touch-action: none;
  }

  .mobile-bar {
    display: flex;
    flex-shrink: 0;
    margin-bottom: 12px;
  }

  .content {
    padding: 12px 12px 16px;
  }

  .site-footer {
    padding: 8px 12px;
    font-size: 12px;
  }
}
</style>
