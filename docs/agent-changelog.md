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
