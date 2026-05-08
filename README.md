# Noah Resume · 个人简历站点

基于 **Next.js App Router** 的单页个人简历 / Portfolio：履历、项目、技能与联系方式集中展示，支持打印导出 PDF，文案与数据由 **`lib/meta.json`** 统一管理。

---

## 功能概览

| 能力 | 说明 |
|------|------|
| **单页分区** | Hero、关于、技术栈、工作经历、项目精选、教育、联系；顶部导航与滚动联动 |
| **内容数据源** | `lib/meta.json`（站点 SEO、`resume` 履历、`ui` 界面文案） |
| **类型收窄** | `lib/meta.ts` 导出默认 meta，修正 JSON 导入导致的 `openGraph.type` 字面量类型 |
| **动效** | `tw-animate-css` 入场动画；区块内 `Reveal` / `animate-in` 等 |
| **打印** | Header「PDF」与联系区按钮触发浏览器打印（可用「另存为 PDF」） |
| **分析** | 生产环境挂载 `@vercel/analytics` |

---

## 技术栈

- **框架**：Next.js **16**（Turbopack 开发构建）、React **19**
- **语言**：TypeScript **5.7**
- **样式**：Tailwind CSS **v4**（`@tailwindcss/postcss`）、`tw-animate-css`
- **组件**：shadcn/ui（New York、`components/ui`）
- **图标**：lucide-react
- **字体**（`next/font/google`）：Inter、JetBrains Mono、Instrument Serif；中文辅助 **Noto Sans SC / Noto Serif SC**
- **代码风格**：Biome（格式化）

---

## 环境要求

- **Node.js**：建议 **22.x**（与 `package.json` 中 `@types/node` 一致）
- 包管理：**pnpm** / npm / yarn 均可（下文以 `pnpm` 为例）

---

## 快速开始

```bash
# 安装依赖
pnpm install

# 本地开发（默认 http://localhost:3000）
pnpm dev

# 生产构建
pnpm build

# 启动生产服务
pnpm start
```

---

## 脚本说明

| 命令 | 作用 |
|------|------|
| `pnpm dev` | 启动开发服务器 |
| `pnpm build` | 生产构建 |
| `pnpm start` | 运行构建产物 |
| `pnpm fmt` | `biome format --write` 格式化仓库 |

---

## 项目结构（核心路径）

```
app/
  layout.tsx          # 根布局：字体变量、Metadata（来自 meta.site.metadata）、Analytics
  page.tsx            # 首页：各 Section 组合
components/
  *-section.tsx       # 页面区块
  site-header.tsx     # 固定顶栏、锚点导航（client）
  reveal.tsx          # 视口入场动画封装
  ui/                 # shadcn 组件
lib/
  meta.json           # ★ 站点与履历、UI 文案（主要编辑入口）
  meta.ts             # 默认导出 meta + Open Graph type 收窄
  utils.ts            # cn() 等工具
styles/
  globals.css         # Tailwind 入口、主题变量、全局工具类
components.json       # shadcn CLI 配置
next.config.mjs
postcss.config.mjs
biome.json
```

---

## 内容维护：`lib/meta.json`

所有面向用户的文案与结构化履历建议 **只改此文件**（再通过 `lib/meta` 被引用），避免散落在组件里。

### 顶层结构

```json
{
  "site": { "metadata": { ... } },
  "resume": {
    "profile": { ... },
    "jobIntent": { ... },
    "stats": [ ... ],
    "skillGroups": [ ... ],
    "experiences": [ ... ],
    "projects": [ ... ],
    "techMarqueeItems": [ ... ],
    "education": { ... }
  },
  "ui": {
    "navigation": [ ... ],
    "header": { ... },
    "hero": { ... },
    "about": { ... },
    "skills": { ... },
    "experience": { ... },
    "projects": { ... },
    "contact": { ... },
    ...
  }
}
```

| 区域 | 用途 |
|------|------|
| **`site.metadata`** | `<title>`、`description`、`keywords`、`authors`、`openGraph`（标题、描述、`type: "profile"`） |
| **`resume.profile`** | 姓名、联系方式、`tagline`、`summary`、`manifesto` 等 |
| **`resume.jobIntent`** | 求职意向：侧栏 Role、Open to 文案、联系区高亮方向等 |
| **`resume.*` 其余** | 数据区块：统计、技能分组、经历、项目、跑马灯词条、教育 |
| **`ui.*`** | 各 Section 的 eyebrow、标题拆字、描述、表格头等纯展示文案 |

修改 JSON 后无需改 `meta.ts`，除非新增字段需要 TypeScript 层面的字面量收窄（当前仅对 `openGraph.type` 做了 `profile` 断言）。

---

## 开发与构建注意事项

### TypeScript 与构建

`next.config.mjs` 中配置了 **`typescript.ignoreBuildErrors: true`**，构建阶段会跳过类型错误。上线前建议在本地执行：

```bash
pnpm exec tsc --noEmit
```

并逐步消除类型问题；长期建议关闭 `ignoreBuildErrors` 或在 CI 中强制 `tsc`。

### 图片

`images.unoptimized: true`：未走 Next 图片优化流水线；若后续启用远程图片优化，可调整此项与 `next/image` 用法。

### 打印

页面使用 `.no-print` 隐藏不适合打印的区域（如顶栏部分控件）；打印样式见 `styles/globals.css` 内 `@media print`。

---

## shadcn/ui

新增组件时请使用官方 CLI（与 `components.json` 一致），例如：

```bash
pnpm dlx shadcn@latest add button
```

样式与设计令牌集中在 `styles/globals.css` 与 Tailwind v4 `@theme`。

---

## 部署

- 适用于 **Vercel** 等平台：连接仓库后使用默认 Next.js 构建命令即可。
- 生产环境会自动加载 **Vercel Analytics**（`NODE_ENV === "production"`）。

---

## 相关文档

- [Next.js](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Biome](https://biomejs.dev)
- [tw-animate-css](https://github.com/Wombosvideo/tw-animate-css)

---

## 许可证

若仓库未单独声明许可证文件，默认以仓库所有者配置为准；对外开源时请补充 `LICENSE`。
