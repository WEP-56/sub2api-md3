<template>
  <div class="relative flex min-h-screen overflow-hidden bg-[var(--m3-surface)] text-[var(--m3-on-surface)] lg:grid lg:grid-cols-[1.1fr_1fr]">
    <!-- ============ 品牌面板（仅桌面端，MD3 风格） ============ -->
    <section class="relative hidden overflow-hidden r-[28px] m-4 lg:flex lg:flex-col p-10 xl:p-14 bg-[var(--m3-surface-container-low)]">
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0"
        :style="{
          background: `
            radial-gradient(80% 60% at 20% 0%, color-mix(in srgb, var(--m3-primary) 16%, transparent), transparent 60%),
            radial-gradient(70% 55% at 90% 35%, color-mix(in srgb, var(--m3-tertiary) 16%, transparent), transparent 60%),
            radial-gradient(60% 50% at 50% 100%, color-mix(in srgb, var(--m3-secondary) 14%, transparent), transparent 65%)`
        }"
      ></div>

      <!-- 站点标识 -->
      <div class="relative flex items-center gap-3">
        <div class="grid h-11 w-11 place-items-center rounded-[13px] bg-[var(--m3-primary)] text-[var(--m3-on-primary)]">
          <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M4 11a9 9 0 0 1 9 9" stroke-linecap="round" />
            <path d="M4 4a16 16 0 0 1 16 16" stroke-linecap="round" />
            <circle cx="5" cy="19" r="1.6" fill="currentColor" stroke="none" />
          </svg>
        </div>
        <div>
          <p class="text-[22px] font-medium leading-none text-[var(--m3-on-surface)]">{{ siteName }}</p>
          <p class="mt-1 text-xs font-medium tracking-wide text-[var(--m3-on-surface-variant)]">
            {{ siteSubtitle }}
          </p>
        </div>
      </div>

      <!-- 主标语 -->
      <div class="relative mt-14 max-w-xl">
        <h1
          class="text-[36px] font-normal leading-[44px] text-[var(--m3-on-surface)]"
          style="letter-spacing: 0"
        >
          {{ t('auth.brandHeadline') }}
        </h1>
        <p class="mt-5 text-[16px] leading-6 text-[var(--m3-on-surface-variant)]">
          {{ t('auth.brandSubheadline') }}
        </p>
      </div>

      <!-- 平台标签 -->
      <div class="relative mt-6 flex flex-wrap gap-2">
        <span
          v-for="p in platformTags"
          :key="p"
          class="inline-flex items-center rounded-full bg-[var(--m3-secondary-container)] px-3.5 py-1.5 text-sm font-medium text-[var(--m3-on-secondary-container)]"
        >
          {{ p }}
        </span>
      </div>

      <!-- 底部特性 -->
      <div class="relative mt-auto grid grid-cols-2 gap-3 pt-12">
        <div
          v-for="f in features"
          :key="f.title"
          class="rounded-2xl bg-[color-mix(in_srgb,var(--m3-surface-container)_80%,transparent)] p-4"
        >
          <p class="text-sm font-medium text-[var(--m3-on-surface)]">{{ f.title }}</p>
          <p class="mt-1 text-xs leading-4 text-[var(--m3-on-surface-variant)]">{{ f.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ============ 表单面板 ============ -->
    <section class="relative flex flex-col items-center justify-center px-6 py-10">
      <!-- 移动端标识 -->
      <div class="mb-6 flex items-center gap-3 lg:hidden">
        <div class="grid h-10 w-10 place-items-center rounded-xl bg-[var(--m3-primary)] text-[var(--m3-on-primary)]">
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M4 11a9 9 0 0 1 9 9" stroke-linecap="round" />
            <path d="M4 4a16 16 0 0 1 16 16" stroke-linecap="round" />
            <circle cx="5" cy="19" r="1.6" fill="currentColor" stroke="none" />
          </svg>
        </div>
        <p class="text-xl font-medium">{{ siteName }}</p>
      </div>

      <!-- 卡片容器 -->
      <div class="relative z-10 w-full max-w-[400px]">
        <div class="overflow-hidden rounded-xl border border-[var(--m3-outline-variant)] bg-[var(--m3-surface-container-lowest)]">
          <div class="p-5 sm:p-8">
            <slot />
          </div>
        </div>

        <!-- Footer Links -->
        <div class="mt-6 text-center text-sm">
          <slot name="footer" />
        </div>

        <!-- Copyright -->
        <div class="mt-6 text-center text-xs text-[var(--m3-on-surface-variant)]">
          &copy; {{ currentYear }} {{ siteName }}. All rights reserved.
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/stores'

const { t } = useI18n()
const appStore = useAppStore()

const siteName = computed(() => appStore.siteName || 'Sub2API')
const siteSubtitle = computed(() => appStore.cachedPublicSettings?.site_subtitle || 'Subscription to API Conversion Platform')

const currentYear = computed(() => new Date().getFullYear())

const platformTags = computed(() => {
  const raw = t('auth.brandPlatforms')
  return raw.split(/[,，、]/).map((s) => s.trim()).filter(Boolean).slice(0, 6)
})

const features = computed(() => {
  const raw = t('auth.brandFeatures')
  // 格式：标题|描述 按逗号/顿号分隔组
  return raw.split(/[,，]/).map((s) => s.trim()).filter(Boolean).map((item) => {
    const [title, desc] = item.split('|')
    return { title: title?.trim() ?? '', desc: desc?.trim() ?? '' }
  }).slice(0, 4)
})

onMounted(() => {
  appStore.fetchPublicSettings()
})
</script>

<style scoped>
.text-gradient {
  @apply bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent;
}
</style>
