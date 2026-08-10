# Agent Changelog

> **用途**：供 AI coding agents（WorkBuddy、Cursor 等）之间同步改动记录。
> **规则**：每次改动都必须追加一条记录，commit 时带上 `[agent-changelog]` 前缀方便检索。
> **格式**：`## YYYY-MM-DD — 简短标题`，下面包含 Agent、类型、描述、文件、Commit。

---

## 2026-08-10 — 补全第一版 hero 篆体「真程」

- **Agent**: Cursor
- **类型**: `fix`
- **描述**: 第一版固定版缺篆体「真程」。恢复 ZhenCheng Seal 字体与 hero 品牌排版（Real Travel + 真程），并补 eyebrow；更新 `v1-fixed` 指向完整基线。
- **文件**: `src/components/CinematicHero.tsx`, `src/App.css`, `src/index.css`, `src/i18n/translations.ts`, `src/assets/fonts/*`, `public/fonts/*`, `docs/baseline-v1.md`, `AGENTS.md`

---

## 2026-08-09 — 钉选「第一版固定版」Baseline v1

- **Agent**: Cursor
- **类型**: `docs`
- **描述**: 用户指定当前线上 UI 为第一版固定版。Git tag `v1-fixed` → `a9a8d1b`（Bloom 海岸视频 hero + 导航 Logo，无 Paper Relic 背景）。此后改首屏/品牌须先确认；口令「恢复到第一版」即回此 tag。
- **文件**: `AGENTS.md`, `docs/baseline-v1.md`, `docs/agent-changelog.md`
- **Tag**: `v1-fixed` @ `a9a8d1b`

---

## 2026-08-08 — 西安示例：高德一键自驾导航（测试）

- **Agent**: Cursor
- **类型**: `feat`
- **描述**: 在西安样例行程页加入高德 URI 一键导航，先覆盖 Day2 兵马俑自驾与 Day1 机场接驳，验证「混合行程里的自驾段 → 打开高德」工具链。
- **文件**: `src/services/amap.ts`, `src/data/xianDriveLegs.ts`, `src/components/AmapNav.tsx`, `src/pages/Trip.tsx`, `src/i18n/translations.ts`, `src/App.css`
- **Commit**: `485f7f8` — Xi'an Amap one-tap nav
- **详情**:
  - `buildAmapNavigationUrl`：`uri.amap.com/navigation` + GCJ-02 + `callnative=1`，途经点最多 1 个
  - Day2：酒店→兵马俑；兵马俑→华清宫(via)→回民街；Day1：咸阳 T3→钟楼酒店
  - Trip 页日历导出下方挂载 `AmapNav`，可按当天 / 全部自驾段筛选

---

## 2026-08-07 — 补全 Bloom Ken Burns Hero 动画 keyframes

- **Agent**: WorkBuddy
- **类型**: `fix`（Bug 修复）
- **描述**: `App.css` 引用了 5 个 `bloom-kenburns*` 动画名但 `@keyframes` 定义全部缺失，导致 CinematicHero 场景切换时图片没有 Ken Burns 推进+平移效果。补上 5 个 keyframes + `is-prev` 平滑退出过渡。
- **文件**: `src/App.css`（+56 行）
- **Commit**: `1fd7645` — `fix: add missing Bloom Ken Burns keyframes for hero scene animations`
- **详情**:
  - 新增 `@keyframes bloom-kenburns`（居中推进：scale 1.1→1.22 + 微上移）
  - 新增 `bloom-kenburns-tl/tr/bl/br` 四个方向性变体（各含 ±2% 水平 + ±1.8% 垂直平移）
  - 新增 `.cine-plate.is-prev .cine-plate__media` 规则（1.35s ease-out drift 回缩放原点，避免切换时跳变）
  - 所有动画限 `@media (prefers-reduced-motion: no-preference)`，6.5s ease-out forwards

---

## 2026-08-07 — 5 语言 i18n 国际化（默认英文）

- **Agent**: WorkBuddy
- **类型**: `feat`（新功能）
- **描述**: 实现 en/zh/fr/ja/ko 五语言国际化。新增 `src/i18n/` 模块（translations.ts + LanguageContext.tsx），Landing、CinematicHero、Plan、Trip、Community 全部页面均已翻译。默认语言为英文，语言偏好存储在 localStorage key `rt-lang`。SiteChrome 导航栏增加语言下拉切换器（flag emoji + 语言名）。
- **文件**:
  - 新增: `src/i18n/translations.ts`, `src/i18n/LanguageContext.tsx`, `src/i18n/index.ts`
  - 修改: `src/App.tsx`, `src/components/SiteChrome.tsx`, `src/pages/Landing.tsx`, `src/pages/CinematicHero.tsx`, `src/pages/Plan.tsx`, `src/pages/Trip.tsx`, `src/pages/Community.tsx`
- **Commit**: `84c5bb6` — `feat: complete 5-language i18n for Trip and Community pages`
- **详情**:
  - 使用 Lingui 风格 `t(key)` 辅助函数，类型安全的键名
  - `useLang()` hook 返回 `{ lang, setLang, t, tp }`，其中 `tp(key, params)` 支持模板参数
  - 社区页面 demo 数据的 `from`/`when`/`imageAlt` 等字段通过 `t()` 的 fallback 机制（找不到 key 时返回原字符串）实现兼容
  - 社区 composer 表单完整翻译，分享发布流程的默认值使用翻译 key
  - 修复 Trip.tsx 中 `kindLabel` 未定义 bug，改为翻译 key `kindKeys`
  - 构建验证通过，TypeScript 零错误

---

## 模板（新记录复制此块）

<!--
## YYYY-MM-DD — 简短标题

- **Agent**: WorkBuddy / Cursor
- **类型**: `fix` / `feat` / `refactor` / `style` / `docs` / `perf`
- **描述**: 一句话说明做了什么、为什么做
- **文件**: `path/to/file1`, `path/to/file2`
- **Commit**: `abc1234` — commit message
- **详情**:
  - 具体改动点 1
  - 具体改动点 2
-->
