# 第一版固定版（Baseline v1）

> **用户口令**：说「恢复到第一版」即恢复到本基线。  
> **Git tag**：`v1-fixed`  
> **线上**：https://woheshiwen.github.io/real-travel/  
> **约定**：以后所有改动都以本基线为起点；触及冻结范围须先与用户确认。

## 冻结范围（不得擅自改）

未获用户明确确认前，**不要**改动以下内容（含「顺手优化」）：

| 区域 | 基线内容 |
|------|----------|
| Hero 首屏 | Bloom 海岸循环视频：`public/hero/hero-{1,2,3}.{mp4,jpg}`，交叉淡入 + `bloom-drift*` |
| Hero 品牌字 | 大号 **Real Travel** + 右侧篆体 **真程**（`ZhenCheng Seal` / `src/assets/fonts/zhencheng-seal.*`） |
| Hero 眉题 | `hero.eyebrow`（英：Itineraries driven by live conditions） |
| 导航品牌 | 镂空 Logo：`public/brand/logo-nav-lg.png` |
| Favicon | `public/favicon.ico` + `public/brand/favicon-32.png` + `apple-touch-icon.png` |
| 首页 2/3 屏 | **无** Paper Relic / `RelicBackdrop` |
| Pages 路径 | 静态资源必须用 `import.meta.env.BASE_URL`（`/real-travel/`） |

## 基线保留的 `public/` 资产（已清理未引用文件）

```
public/
  favicon.ico
  brand/
    apple-touch-icon.png
    favicon-32.png
    logo-nav-lg.png
  fonts/
    OFL-JFZSKSealScript.txt          # 篆体 OFL 许可全文
  hero/
    hero-1.jpg / hero-1.mp4
    hero-2.jpg / hero-2.mp4
    hero-3.jpg / hero-3.mp4
```

运行时字体从 `src/assets/fonts/` 打包，勿再往 `public/` 塞未引用素材。

## 恢复步骤（Agent）

```bash
git fetch origin tag v1-fixed
git checkout -b cursor/restore-baseline-v1-5360 v1-fixed
# 优先用 revert 回退后续提交；勿轻易 hard reset 除非用户明确要求
```

## 修改策略

- 冻结范围：**先说明 → 等确认 → 再改**。
- 其他功能可改，但不要牵连首屏/品牌/基线资产清单。
