# 第一版固定版（Baseline v1）

> **用户口令**：说「恢复到第一版」即恢复到本基线。  
> **Git tag**：`v1-fixed`  
> **Commit**：`a9a8d1bdb8b775864180a0cf652c3450ba7385c7`  
> **日期**：2026-08-09  
> **线上**：https://woheshiwen.github.io/real-travel/

## 冻结范围（不得擅自改）

未获用户明确确认前，**不要**改动以下内容（含「顺手优化」）：

| 区域 | 基线内容 |
|------|----------|
| Hero 首屏 | Bloom 海岸循环视频：`public/hero/hero-{1,2,3}.{mp4,jpg}`，交叉淡入 + `bloom-drift*` |
| 导航品牌 | 镂空 Logo：`public/brand/logo-nav-lg.png`（`SiteChrome` + `BASE_URL`） |
| Favicon | `favicon.ico` + `public/brand/favicon-32.png` + apple-touch |
| 首页 2/3 屏 | **无** Paper Relic / `RelicBackdrop` 氛围背景（已回退） |
| Pages 路径 | 静态资源必须用 `import.meta.env.BASE_URL`（站点在 `/real-travel/`） |

## 恢复步骤（Agent）

```bash
git fetch origin tag v1-fixed
git checkout -b cursor/restore-baseline-v1-5360 v1-fixed
# 将 v1-fixed 的树合并/重置回 main（按用户意图选 merge 或 revert 后续提交）
# 推送并部署 Pages 后，请用户强制刷新线上站
```

或在 `main` 上：

```bash
git revert --no-edit <after-v1-fixed-commits...>   # 优先：可保留历史
# 仅当用户明确要求硬回退时才 reset --hard v1-fixed
```

## 修改策略

- 任何触及上表冻结范围的改动：**先说明影响 → 等用户确认 → 再改**。
- 非冻结范围（API 契约、行程页、足迹广场等）可正常改，但仍避免无谓牵连首屏/品牌。
