# Agent Changelog

> **用途**：供 AI coding agents（WorkBuddy、Cursor 等）之间同步改动记录。
> **规则**：每次改动都必须追加一条记录，commit 时带上 `[agent-changelog]` 前缀方便检索。
> **格式**：`## YYYY-MM-DD — 简短标题`，下面包含 Agent、类型、描述、文件、Commit。

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

## 2026-08-07 — Bloom 全屏循环视频 Hero + 五语 i18n（英文为主）

- **Agent**: Cursor
- **类型**: `feat`
- **描述**: 按 bloom3d.studio 思路把 Hero 改成全屏循环视频（不再依赖缺失的 ken-burns 单图动画）；并落地真正的多语言系统，默认英文、单语显示（禁止中英混排）。
- **文件**: `src/components/CinematicHero.tsx`, `src/components/LanguageSwitcher.tsx`, `src/components/SiteChrome.tsx`, `src/i18n/**`, `src/pages/{Landing,Plan,Community,Trip}.tsx`, `src/App.css`, `public/hero/*`, `package.json`, `index.html`
- **Commit**: `87d9326` … `8420af4`（分支 `cursor/i18n-bloom-hero-c145`，PR #11）
- **详情**:
  - Hero：三段海岸视频始终 `play()` + ~6.5s 交叉淡入淡出 + `bloom-drift*` 持续推拉 + 鼠标视差（UI `pointer-events: none`，避免挡 pointer）
  - 根因修复：此前 ken-burns 引用不存在的 `@keyframes`；白屏因手动部署漏了 `VITE_BASE_PATH=/real-travel/`（已加 `npm run build:pages`）
  - i18n：`en` / `zh-CN` / `fr` / `ja` / `ko`，右上角切换，`localStorage` key `real-travel-locale-v2`，默认 `en`
  - 品牌单字段 `t.brand`（EN=Real Travel，中文=真程），导航/落地页/规划表单/足迹预览跟当前语言走
  - `gh-pages` 需用 `VITE_BASE_PATH=/real-travel/` 构建后再 force-push，否则会再次白屏

---

## 2026-08-07 — 合并 main changelog，保留 drift + kenburns keyframes

- **Agent**: Cursor
- **类型**: `docs` / `merge`
- **描述**: 采纳 WorkBuddy 的 `docs/agent-changelog.md` 协同约定；合并 `1fd7645` 的 kenburns keyframes，同时保留当前视频 Hero 使用的 `bloom-drift*`。
- **文件**: `docs/agent-changelog.md`, `src/App.css`
- **Commit**: `92db2f6` — merge main + agent-changelog Cursor entries
- **详情**:
  - 确认后续每次改动必须在本文件追加记录
  - CSS：当前 Hero 用 `bloom-drift`；WorkBuddy 的 `bloom-kenburns*` 保留备用

---

## 2026-08-07 — 定稿透明镂空品牌 Logo 并接入导航

- **Agent**: Cursor
- **类型**: `feat` / `style`
- **描述**: 将确认的祈年殿+框+真程+路+飞机 Logo 去底做成透明镂空 PNG；深色站用浅色描边版本；接入顶栏与 favicon。
- **文件**: `public/brand/*`, `public/favicon.ico`, `src/components/SiteChrome.tsx`, `src/App.css`, `index.html`
- **Commit**: `76700a6` — transparent hollow brand logo
- **详情**:
  - 主文件：`public/brand/real-travel-logo.png`（透明）、`logo-nav.png`（顶栏）、`favicon-*.png` / `favicon.ico`
  - 浅色底备用：`real-travel-logo-on-light.png`
  - `SiteChrome` 使用 `brand/logo-nav.png`，文字品牌改为 `visually-hidden` 避免与图内字重复

---

## 2026-08-07 — 放大导航 Logo + Hero 补「真程」字标

- **Agent**: Cursor
- **类型**: `style` / `fix`
- **描述**: 顶栏 Logo 过小看不清；放大并加磨砂衬底提升对比。Hero 主品牌旁固定加「真程」（篆体感衬线），与 Real Travel 并排。
- **文件**: `src/App.css`, `src/components/SiteChrome.tsx`, `src/components/CinematicHero.tsx`, `public/brand/logo-nav.png`
- **Commit**: `d6c8c6e` — enlarge nav logo + hero 真程
- **详情**:
  - Logo 高度约 4.25rem + 深色磨砂底托，避免淹没在视频背景里
  - Hero：`Real Travel` + `真程`（Noto Serif SC 展示体，字距接近印章字）

---

## 2026-08-07 — Logo 去底托换暖色描边 + Hero 篆体「真程」

- **Agent**: Cursor
- **类型**: `style`
- **描述**: 去掉导航 Logo 深色底托；按站点暗色+暖金属氛围重绘透明 Logo 线条色。Hero「真程」改用开源篆体子集（敬峰中山王篆 OFL），颜色用暖金 `#e0c295` 与白色 Real Travel 区分。
- **文件**: `public/brand/real-travel-logo*.png`, `public/brand/logo-nav*.png`, `public/fonts/*`, `src/assets/fonts/*`, `src/index.css`, `src/App.css`, `src/components/SiteChrome.tsx`
- **Commit**: （本条随此次 commit）
- **详情**:
  - Logo：奶油描边 + 桃色太阳/飞机 + 沙色路，透明底，仅靠 drop-shadow 提可读性
  - `@font-face "ZhenCheng Seal"` 仅含「真程」两字（~1.5KB woff2）

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
