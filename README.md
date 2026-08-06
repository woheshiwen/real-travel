# 真程 Real Travel

结合**实况天气**与**出发地交通**的 AI 动态行程系统，并面向长期做成：

1. **大家真正用得上、信得过的实用系统**（数据可核对、行程可改版）
2. **可分享快乐的交互平台**（足迹广场：亲历喜悦与避坑沉淀）

## License

本仓库中**开源发布的前端与演示代码**采用 [Apache License 2.0](./LICENSE)。

| 部分 | 是否开源 | 说明 |
|------|----------|------|
| 本仓库前端 / 演示（`src/` 等） | 是 · Apache-2.0 | 可查看、修改、商用，需遵守 Apache-2.0 |
| 服务端后台 / API / 数据管线 / 运营后台 | **否** | 专有软件，私有仓库部署，不在本仓库发布 |
| 品牌「真程 / Real Travel」 | 商标保留 | Apache-2.0 **不授予**商标使用权 |

完整许可见 [`LICENSE`](./LICENSE)，归属声明见 [`NOTICE`](./NOTICE)。

> 历史旧站压缩包已从本公开仓库移除；后台能力请使用私有仓库 `real-travel-api`（专有，不开源）。

## 当前演示

| 路由 | 说明 |
|------|------|
| `/` | 品牌与信任原则、足迹预览 |
| `/plan` | 规划向导 |
| `/trip/xian` | 西安家庭游动态路书（WorkBuddy v9 结构） |
| `/community` | 足迹广场（分享快乐 / 共鸣） |

```bash
npm install
npm run dev
```

### 连接私有后台（可选）

```bash
cp .env.example .env
# .env 中设置：VITE_API_BASE_URL=http://127.0.0.1:8787
```

未配置时前端使用内置演示数据，可独立运行；配置后足迹广场与规划会调用私有 API，失败自动回落演示数据。

### 在线访问（GitHub Pages）

合并到 `main` 后，Actions 会自动构建并发布：

https://woheshiwen.github.io/real-travel/

（首次需在仓库 Settings → Pages 选择 **GitHub Actions** 作为源；本仓库已附带 workflow。）

## 仓库拆分

| 仓库 | 可见性 | 内容 |
|------|--------|------|
| `woheshiwen/real-travel`（本仓库） | Public · Apache-2.0 | 前端与产品演示 |
| `woheshiwen/real-travel-api` | **Private** | 后台 API、数据接入、账号与运营逻辑 |

## 长期方向

- 开源：客户端 / 演示前端（本仓库）
- 自营闭源：后台 API、实时天气与交通接入、账号与内容治理、运营后台
- 行程结束后一键分享到足迹广场
