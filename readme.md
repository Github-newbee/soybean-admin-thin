## 简介

[`SoybeanAdmin`](https://github.com/soybeanjs/soybean-admin) 是一个清新优雅、高颜值且功能强大的后台管理模板，基于最新的前端技术栈，包括 Vue3, Vite5, TypeScript, Pinia 和 UnoCSS。它内置了丰富的主题配置和组件，代码规范严谨，实现了自动化的文件路由系统。此外，它还采用了基于 ApiFox 的在线Mock数据方案。`SoybeanAdmin` 为您提供了一站式的后台管理解决方案，无需额外配置，开箱即用。同样是一个快速学习前沿技术的最佳实践。

## 特性

- **前沿技术应用**：采用 Vue3, Vite5, TypeScript, Pinia 和 UnoCSS 等最新流行的技术栈。
- **清晰的项目架构**：采用 pnpm monorepo 架构，结构清晰，优雅易懂。
- **严格的代码规范**：遵循 [SoybeanJS 规范](https://docs.soybeanjs.cn/zh/standard)，集成了eslint, prettier 和 simple-git-hooks，保证代码的规范性。
- **TypeScript**： 支持严格的类型检查，提高代码的可维护性。
- **丰富的主题配置**：内置多样的主题配置，与 UnoCSS 完美结合。
- **内置国际化方案**：轻松实现多语言支持。
- **自动化文件路由系统**：自动生成路由导入、声明和类型。更多细节请查看 [Elegant Router](https://github.com/soybeanjs/elegant-router)。
- **灵活的权限路由**：同时支持前端静态路由和后端动态路由。
- **丰富的页面组件**：内置多样页面和组件，包括403、404、500页面，以及布局组件、标签组件、主题配置组件等。
- **命令行工具**：内置高效的命令行工具，git提交、删除文件、发布等。
- **移动端适配**：完美支持移动端，实现自适应布局。


## 版本
- **ElementPlusVue 版本:**
  - [预览地址](https://elp.soybeanjs.cn/)
  - [Github 仓库](https://github.com/soybeanjs/soybean-admin-element-plus)

## 文档

- [地址](https://docs.soybeanjs.cn)


## 使用

**环境准备**

确保你的环境满足以下要求：

- **git**: 你需要git来克隆和管理项目版本。
- **NodeJS**: >=18.12.0，推荐 18.19.0 或更高。
- **pnpm**: >= 8.7.0，推荐 8.14.0 或更高。

**克隆项目**

```bash
git clone https://github.com/soybeanjs/soybean-admin.git
```

**安装依赖**

```bash
pnpm i
```
> 由于本项目采用了 pnpm monorepo 的管理方式，因此请不要使用 npm 或 yarn 来安装依赖。

**启动项目**

```bash
pnpm dev
```

**构建项目**

```bash
pnpm build
```

## 开源协议

项目基于 [MIT © 2021 Soybean](./LICENSE) 协议，仅供学习参考，商业使用请保留作者版权信息，作者不保证也不承担任何软件的使用风险。
