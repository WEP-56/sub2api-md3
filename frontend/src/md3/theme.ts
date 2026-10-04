/**
 * MD3 主题引擎 — Material You 动态色彩（Tonal Spot 算法）
 *
 * 职责：
 * 1. 由「种子色 + 明暗」生成整套 M3 色调方案，写入 CSS 变量 --m3-*
 * 2. 与原站的明暗模式体系互通：沿用 localStorage["theme"] 与 .dark class
 * 3. 种子色持久化在 localStorage["m3_palette"]，默认保持原站青色系观感
 *
 * 原站的 primary-500 (#14b8a6) 在 HCT 空间偏浅，直接做种子色会导致
 * 深色下对比度不足，这里采用同色相、更深一档的 #0B6B60 作为默认种子。
 */

import {
  argbFromHex,
  hexFromArgb,
  Hct,
  SchemeTonalSpot,
  MaterialDynamicColors,
  type DynamicColor,
} from '@material/material-color-utilities'

/** 预设种子色面板 — 个人中心/设置页可暴露给用户切换 */
export const M3_PALETTES = [
  { id: 'teal', name: '翡冷青', seed: '#0B6B60', desc: '默认 · 延续原站青色系' },
  { id: 'baseline', name: '经典紫', seed: '#6750A4', desc: 'Material You 基准' },
  { id: 'ocean', name: '海洋蓝', seed: '#0B57D0', desc: 'Google 蓝' },
  { id: 'forest', name: '深林绿', seed: '#1B6B3A', desc: '自然' },
  { id: 'amber', name: '暖阳橙', seed: '#8C5000', desc: '活力' },
  { id: 'rose', name: '玫瑰粉', seed: '#984061', desc: '柔和' },
  { id: 'crimson', name: '胭脂红', seed: '#B3261E', desc: '醒目' },
  { id: 'graphite', name: '石墨灰', seed: '#5B5F72', desc: '沉稳' },
] as const

export type M3PaletteId = (typeof M3_PALETTES)[number]['id']

const PALETTE_STORAGE_KEY = 'm3_palette'
const THEME_STORAGE_KEY = 'theme' // 与原站 main.ts initThemeClass 共用

/** CSS 变量名 ↔ M3 动态色 映射表 */
const TOKEN_MAP: [string, DynamicColor][] = [
  ['primary', MaterialDynamicColors.primary],
  ['on-primary', MaterialDynamicColors.onPrimary],
  ['primary-container', MaterialDynamicColors.primaryContainer],
  ['on-primary-container', MaterialDynamicColors.onPrimaryContainer],
  ['inverse-primary', MaterialDynamicColors.inversePrimary],
  ['primary-fixed', MaterialDynamicColors.primaryFixed],
  ['primary-fixed-dim', MaterialDynamicColors.primaryFixedDim],
  ['on-primary-fixed', MaterialDynamicColors.onPrimaryFixed],
  ['on-primary-fixed-variant', MaterialDynamicColors.onPrimaryFixedVariant],
  ['secondary', MaterialDynamicColors.secondary],
  ['on-secondary', MaterialDynamicColors.onSecondary],
  ['secondary-container', MaterialDynamicColors.secondaryContainer],
  ['on-secondary-container', MaterialDynamicColors.onSecondaryContainer],
  ['secondary-fixed', MaterialDynamicColors.secondaryFixed],
  ['secondary-fixed-dim', MaterialDynamicColors.secondaryFixedDim],
  ['on-secondary-fixed', MaterialDynamicColors.onSecondaryFixed],
  ['on-secondary-fixed-variant', MaterialDynamicColors.onSecondaryFixedVariant],
  ['tertiary', MaterialDynamicColors.tertiary],
  ['on-tertiary', MaterialDynamicColors.onTertiary],
  ['tertiary-container', MaterialDynamicColors.tertiaryContainer],
  ['on-tertiary-container', MaterialDynamicColors.onTertiaryContainer],
  ['tertiary-fixed', MaterialDynamicColors.tertiaryFixed],
  ['tertiary-fixed-dim', MaterialDynamicColors.tertiaryFixedDim],
  ['on-tertiary-fixed', MaterialDynamicColors.onTertiaryFixed],
  ['on-tertiary-fixed-variant', MaterialDynamicColors.onTertiaryFixedVariant],
  ['error', MaterialDynamicColors.error],
  ['on-error', MaterialDynamicColors.onError],
  ['error-container', MaterialDynamicColors.errorContainer],
  ['on-error-container', MaterialDynamicColors.onErrorContainer],
  ['surface', MaterialDynamicColors.surface],
  ['on-surface', MaterialDynamicColors.onSurface],
  ['surface-variant', MaterialDynamicColors.surfaceVariant],
  ['on-surface-variant', MaterialDynamicColors.onSurfaceVariant],
  ['surface-dim', MaterialDynamicColors.surfaceDim],
  ['surface-bright', MaterialDynamicColors.surfaceBright],
  ['surface-container-lowest', MaterialDynamicColors.surfaceContainerLowest],
  ['surface-container-low', MaterialDynamicColors.surfaceContainerLow],
  ['surface-container', MaterialDynamicColors.surfaceContainer],
  ['surface-container-high', MaterialDynamicColors.surfaceContainerHigh],
  ['surface-container-highest', MaterialDynamicColors.surfaceContainerHighest],
  ['surface-tint', MaterialDynamicColors.surfaceTint],
  ['inverse-surface', MaterialDynamicColors.inverseSurface],
  ['inverse-on-surface', MaterialDynamicColors.inverseOnSurface],
  ['background', MaterialDynamicColors.background],
  ['on-background', MaterialDynamicColors.onBackground],
  ['outline', MaterialDynamicColors.outline],
  ['outline-variant', MaterialDynamicColors.outlineVariant],
]

const schemeCache = new Map<string, Record<string, string>>()

/** 由种子色生成整套 M3 色调方案（Tonal Spot，即 Material You 默认算法） */
export function generateM3Scheme(seed: string, isDark: boolean): Record<string, string> {
  const key = `${seed}-${isDark}`
  const hit = schemeCache.get(key)
  if (hit) return hit
  const scheme = new SchemeTonalSpot(Hct.fromInt(argbFromHex(seed)), isDark, 0)
  const out: Record<string, string> = {}
  for (const [cssName, color] of TOKEN_MAP) {
    out[cssName] = hexFromArgb(color.getArgb(scheme))
  }
  schemeCache.set(key, out)
  return out
}

/** 读取持久化的配色 ID（无效值回退默认翡冷青） */
export function getM3PaletteId(): M3PaletteId {
  try {
    const saved = localStorage.getItem(PALETTE_STORAGE_KEY)
    if (saved && M3_PALETTES.some((p) => p.id === saved)) return saved as M3PaletteId
  } catch {
    /* ignore */
  }
  return 'teal'
}

/** 切换配色并立即应用 */
export function setM3Palette(id: M3PaletteId): void {
  localStorage.setItem(PALETTE_STORAGE_KEY, id)
  applyM3Theme()
}

/** 当前是否深色模式（与原站同一判定逻辑） */
export function isDarkMode(): boolean {
  const saved = localStorage.getItem(THEME_STORAGE_KEY)
  return (
    saved === 'dark' ||
    (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)
  )
}

/** 生成当前状态对应的方案并把全部令牌写入 :root */
export function applyM3Theme(): void {
  const paletteId = getM3PaletteId()
  const palette = M3_PALETTES.find((p) => p.id === paletteId) ?? M3_PALETTES[0]
  const dark = isDarkMode()
  const tokens = generateM3Scheme(palette.seed, dark)

  const root = document.documentElement
  for (const [name, value] of Object.entries(tokens)) {
    root.style.setProperty(`--m3-${name}`, value)
  }
}

/**
 * 初始化：应用一次主题 + 监听 .dark class 变化（原站切换明暗时重算令牌）
 * 在 main.ts 的 initThemeClass() 之后调用。
 */
export function initM3Theme(): void {
  applyM3Theme()

  // 原站通过 classList.toggle('dark') 切换明暗；用 MutationObserver 感知并重算。
  const observer = new MutationObserver(applyM3Theme)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })

  // 系统明暗变化（用户未显式选择时）也会改变 isDarkMode 的结果
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyM3Theme)
}
