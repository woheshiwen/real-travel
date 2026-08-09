# Agent notes — 真程 Real Travel（前端）

- **API 契约**：[`docs/api-contract.md`](./docs/api-contract.md) 是前后端唯一真相。改接口先改该文档。
- **私有后台**：`woheshiwen/real-travel-api`（UNLICENSED）。本仓通过 `VITE_API_BASE_URL` 调用；默认端口 `8787`。
- **回落**：API 未配置或失败时，必须继续使用内置演示数据，保证公开前端可独立运行。
- **协作**：与后台 agent 不能直连。完成后用契约文档末尾的「交接条」模板，请用户转发给另一边。
- **许可**：本仓库 Apache-2.0；勿引入与 Apache-2.0 冲突的第三方源码（如部分付费 UI kit）。

## 第一版固定版（Baseline v1）— 冻结

- **口令**：用户说「恢复到第一版」→ 恢复到 Git tag **`v1-fixed`**（commit `a9a8d1b`）。细节见 [`docs/baseline-v1.md`](./docs/baseline-v1.md)。
- **内容**：Bloom 海岸循环视频 hero + 导航镂空 Logo；**无** Paper Relic 分区背景。
- **纪律**：未获用户明确确认前，**禁止**擅自改动首屏 hero、导航品牌/Logo、favicon，或再加首页氛围背景。有改动提案先说明再等确认。
