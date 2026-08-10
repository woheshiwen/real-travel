# 真程 Real Travel — 变更记录

> 基准版本：`v1-fixed` (commit `a9a8d1b`)
> 线上地址：https://woheshiwen.github.io/real-travel/
> 所有后续改动均以第一版为基础，每次改动记录于此并同步至 GitHub。

---

## 第一版基准 (v1-fixed)

**日期**：2026-08-10
**Commit**：`a9a8d1b` — Merge pull request #19

### 网站结构

| 页面 | 路由 | 文件 | 说明 |
|------|------|------|------|
| 首页 | `/` | `src/pages/Landing.tsx` | 电影感 Hero + 实况对照 + 目的地跑马灯 + 产品原则 + 工作方式 + 足迹预览 + CTA + 页脚 |
| 规划 | `/plan` | `src/pages/Plan.tsx` | 出发地/日期/同行人表单，演示生成深圳→西安行程 |
| 行程 | `/trip/xian` | `src/pages/Trip.tsx` | 西安家庭游示例路书：天气条、每日行程、交通时刻表、费用估算、日历导出 |
| 社区 | `/community` | `src/pages/Community.tsx` | 足迹广场：用户亲历分享与共鸣 |

### 设计系统

- **色调**：深色暗调底 (`#070809` / `#0c0e10`)，暖金色调点缀 (`#c9a36a`)
- **字体**：Instrument Serif (展示标题) + Outfit (正文) + Noto Sans/Serif SC (中文)
- **圆角**：`--radius: 18px`，`--radius-sm: 12px`
- **阴影**：三级阴影系统 (`--shadow-sm` / `--shadow` / `--shadow-lg`)
- **动画**：尊重 `prefers-reduced-motion`，页面淡入、滚动揭示、聚光灯跟随
- **国际化**：5 语言 (en / zh / fr / ja / ko)，基于 Context + flat-key translations

### 首页分区

1. **CinematicHero** — 三场景视频轮播 (coast / tropic / cape)，Ken Burns 效果，鼠标视差，加载器步骤动画
2. **Live Conditions (实况对照)** — 社媒热议 vs 实况预报 vs AI 建议，三栏对照面板
3. **DestinationMarquee (目的地跑马灯)** — 8 个目的地无限滚动
4. **Principles (产品原则)** — 4 张卡片：数据可核对 / 行程可改版 / 快乐可分享 / 社区有边界
5. **How It Works (工作方式)** — 3 步流程
6. **Footprint Square Preview (足迹广场预览)** — 3 条社区分享 + CTA
7. **Footer** — 品牌标识 + 标语 + 版权

### 技术栈

- React 18 + TypeScript + Vite
- React Router (BrowserRouter, basename = `/real-travel`)
- 纯 CSS（无 UI 框架），CSS 变量主题系统
- View Transitions API 支持路由过渡

---

## 改动记录

### 2026-08-10 · 品牌标识固定化

**改动内容**：将 "Real Travel 真程" 固定为统一品牌标识，不随语言切换变化

**涉及文件**：
- `index.html` — 新增崇熹小篆 webfont CDN 链接
- `src/components/CinematicHero.tsx` — Hero 区品牌名改为 "Real Travel" + 篆体 "真程" 并排显示
- `src/pages/Landing.tsx` — 页脚品牌名同步使用篆体 "真程"
- `src/App.css` — 新增 `.cine-hero__brand-zh` 篆体样式（字号 0.6em，暖金色 #f0d2a0，发光效果）；新增 `.brand-zh-seal` / `.footer-seal` 页脚篆体样式；底部对齐 `align-items: flex-end` + 统一 `line-height: 0.95`

**设计决策**：
- 英文 "Real Travel" 始终使用 Instrument Serif 展示字体
- 中文 "真程" 始终使用崇熹小篆体，暖金色，与英文底部对齐
- 品牌标识不随语言切换变化，所有语言下保持一致

---

*后续改动请按以上格式追加记录。*
