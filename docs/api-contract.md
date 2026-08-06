# 真程 Real Travel — API 契约

> **唯一真相（Source of Truth）**  
> 公开前端 [`woheshiwen/real-travel`](https://github.com/woheshiwen/real-travel) 与私有后台 [`woheshiwen/real-travel-api`](https://github.com/woheshiwen/real-travel-api) 必须以本文为准。  
> **改接口 → 先改本文 → 再改实现。** 破坏性变更须在 PR 描述中标明。

| 项 | 约定 |
|----|------|
| Base URL | `http://127.0.0.1:8787`（本地） |
| 前端 env | `VITE_API_BASE_URL`（见 `.env.example`） |
| 编码 | JSON · UTF-8 · **camelCase** |
| CORS | 允许前端 origin（开发期可 `origin: true`） |
| 鉴权 | 当前无（后续再加） |
| 前端回落 | 未配置或请求失败时，前端使用内置演示数据，必须可独立运行 |

---

## 给 Cloud Agent 的指令（复制到 prompt）

```text
前后端以 docs/api-contract.md 为唯一 API 契约。
改接口先改契约文档，再改代码；字段名必须 camelCase。
完成后输出「交接条」（见文档末尾模板），便于另一边 agent 对齐。
```

私有仓 agent 无本文件时：请用户粘贴本文，或从公开仓 `main` 拉取最新版。

---

## 端点一览

| 方法 | 路径 | 说明 |
|------|------|------|
| `GET` | `/health` | 健康检查 |
| `GET` | `/v1/moments` | 足迹广场列表 |
| `POST` | `/v1/moments` | 发布足迹 |
| `POST` | `/v1/trips/plan` | 提交规划约束 → 行程摘要 |
| `GET` | `/v1/trips/:id` | 完整路书（演示 id：`xian`） |
| `GET` | `/v1/conditions/compare` | 社媒热议 vs 实况预报对照 |

---

## 1. `GET /health`

**响应 200**

```json
{
  "status": "ok",
  "service": "real-travel-api",
  "timestamp": "2026-08-06T09:00:00.000Z"
}
```

可选扩展字段（向后兼容）：`database`（`"sqlite"` \| `"mysql"`）等。

---

## 2. Moments（足迹广场）

### 类型 `ApiMoment`

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | |
| `author` | string | |
| `place` | string | |
| `weatherTruth` | string | 天气真相 / 对照一句话 |
| `joy` | string | 快乐瞬间正文 |
| `tip` | string | 小贴士 |
| `likes` | number | |
| `createdAt` | string | ISO-8601 |

### `GET /v1/moments`

**响应 200**

```json
{ "moments": [ /* ApiMoment[]，建议按 createdAt 降序 */ ] }
```

### `POST /v1/moments`

**请求**

| 字段 | 必填 | 类型 |
|------|------|------|
| `place` | ✓ | string |
| `joy` | ✓ | string |
| `author` | | string（默认可由服务端填「我」） |
| `weatherTruth` | | string |
| `tip` | | string |

**响应 201**

```json
{ "moment": { /* ApiMoment */ } }
```

**错误 400** — `place` / `joy` 缺失：

```json
{ "error": "validation_error", "message": "place and joy are required" }
```

---

## 3. Trips（行程）

### 类型 `ApiTripSummary`（`POST /v1/trips/plan` 返回）

| 字段 | 类型 |
|------|------|
| `id` | string |
| `title` | string |
| `origin` | string |
| `destination` | string |
| `dates` | string（展示用，如 `8月11日 — 8月15日`） |
| `party` | string |
| `version` | string |
| `weatherNote` | string |
| `transportNote` | string |
| `createdAt` | string（ISO-8601） |

### `POST /v1/trips/plan`

**请求**

| 字段 | 必填 | 类型 |
|------|------|------|
| `origin` | ✓ | string |
| `destination` | ✓ | string |
| `startDate` | ✓ | string（`YYYY-MM-DD`） |
| `endDate` | ✓ | string（`YYYY-MM-DD`） |
| `party` | ✓ | string |
| `interests` | | string[] |

**响应 201**

```json
{ "trip": { /* ApiTripSummary */ } }
```

### 类型 `TripBook`（`GET /v1/trips/:id`）

完整路书。前端类型见 `src/services/api.ts` 的 `TripBook`；日程结构见 `src/data/xianTrip.ts`。

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 如 `xian` |
| `meta` | `TripMeta` | 见下表 |
| `weatherDays` | `WeatherDay[]` | |
| `weatherSummary` | string | |
| `transportLegs` | `TransportLeg[]` | |
| `transportNote` | string | |
| `days` | `DayPlan[]` | |
| `costs` | `CostRow[]` | |
| `costTotal` | string | |
| `costPerPerson` | string | |
| `tips` | string[] | |
| `situations` | `SituationUpdate[]` | |

**`TripMeta`**

`title` · `version` · `updatedAt` · `origin` · `destination` · `dates` · `nights` · `party` · `goMode` · `returnMode` · `homeNote` · `changelog`

**`WeatherDay`**

`date` · `weekday` · `temp` · `condition` · `icon`（`"rain"` \| `"cloud"` \| `"sun"` \| `"partly"`）· `note`

**`TransportLeg`**

`date` · `dayLabel` · `type` · `code` · `route` · `time` · `duration` · `price`

**`DayPlan`**

`id` · `date` · `weekday` · `title` · `weather` · `weatherIcon` · `bookings[]` · `timeline[]` · `callout?`

**`BookingItem`**: `name` · `detail` · `deadline` · `urgent?`  
**`TimelineItem`**: `time` · `title` · `body`  
**`CostRow`**: `item` · `detail` · `amount`  
**`SituationUpdate`**: `id` · `time` · `kind`（`"weather"` \| `"transport"` \| `"booking"` \| `"social"`）· `title` · `body` · `action?`

### `GET /v1/trips/:id`

**响应 200** — 推荐包装：

```json
{ "trip": { /* TripBook */ } }
```

前端亦接受顶层直接为 `TripBook`（无 `trip` 包装）。

演示数据：`id = "xian"`（西安家庭游 v9，与 `src/data/xianTrip.ts` 对齐）。

**错误 404**

```json
{ "error": "not_found", "message": "trip … not found" }
```

---

## 4. Conditions（实况对照）

### `GET /v1/conditions/compare`

**Query**

| 参数 | 说明 |
|------|------|
| `tripId` | 如 `xian` |
| `destination` | 如 `西安`（不是 `place`） |
| `startDate` | `YYYY-MM-DD` |
| `endDate` | `YYYY-MM-DD` |

### 类型 `ConditionsCompare`

```json
{
  "place": "西安",
  "dateRange": "8/11–8/15",
  "updatedAt": "2026-08-06 11:10",
  "social": {
    "source": "社媒热议",
    "headline": "暴雨别去了",
    "summary": "抖音大量「暴雨别去了」视频",
    "sentiment": "alarm"
  },
  "forecast": {
    "source": "实况预报",
    "headline": "小雨转阴后转晴",
    "summary": "…",
    "sentiment": "positive",
    "days": [ /* WeatherDay[]，可选 */ ],
    "dataSource": "demo"
  },
  "recommendation": {
    "title": "AI 建议",
    "summary": "保留行程。…",
    "verdict": "keep"
  }
}
```

| 枚举 | 取值 |
|------|------|
| `sentiment` | `"alarm"` \| `"neutral"` \| `"positive"` |
| `forecast.dataSource` | `"demo"` \| `"live"` |
| `recommendation.verdict` | `"keep"` \| `"adjust"` \| `"cancel"` |

---

## 错误格式（通用）

```json
{ "error": "validation_error" | "not_found" | string, "message": "…" }
```

HTTP 状态：`400` 校验失败 · `404` 未找到 · `5xx` 服务错误。

---

## 仓库职责

| 仓库 | 可见性 | 职责 |
|------|--------|------|
| `real-travel` | Public · Apache-2.0 | 前端 UI、客户端、演示回落、**本契约文档** |
| `real-travel-api` | Private · UNLICENSED | 接口实现、持久化、天气数据源 |

---

## 变更流程

1. 在本文件（公开仓）更新契约 → 开 PR。  
2. 前端 / 后台各自按契约改实现。  
3. 本地联调：`VITE_API_BASE_URL=http://127.0.0.1:8787`，确认 `/health` 与关键路径。  
4. 用下方「交接条」通知另一边 agent。

---

## 交接条模板（贴给另一边 agent）

```text
## 交接条 · 真程 API
- 契约版本 / 日期：
- 改了哪些接口或字段：
- 破坏性变更：是 / 否（若是，旧字段如何迁移）：
- 对方需要改什么（前端 / 后台）：
- 联调：VITE_API_BASE_URL=http://127.0.0.1:8787
- 相关 PR：
```
