# Node 20.x 升级指南

本项目已成功升级到 Node 20.x 版本。

## 主要变更

### 1. Node.js 版本

- **之前**: Node 14.16.0
- **现在**: Node 20.11.0
- 更新了 `.nvmrc` 文件
- 在 `package.json` 中添加了 `engines` 字段

### 2. Gatsby 升级

- **之前**: Gatsby 3.4.1
- **现在**: Gatsby 5.13.0
- 所有 Gatsby 插件已升级到对应的 v5 版本

### 3. React 升级

- **之前**: React 17.0.2
- **现在**: React 18.2.0
- React DOM 也升级到 18.2.0

### 4. 其他主要依赖升级

- **styled-components**: 5.3.0 → 6.1.8
- **babel-plugin-styled-components**: 1.12.0 → 2.1.4
- **eslint**: 7.25.0 → 8.57.0
- **prettier**: 2.2.1 → 3.2.5
- **husky**: 6.0.0 → 9.0.11
- **lint-staged**: 10.1.2 → 15.2.2

### 5. 配置变更

- ✅ 移除了 `gatsby-remark-images` 中已弃用的 `tracedSVG` 选项
- ✅ 将 `gatsby-plugin-google-analytics` 替换为 `gatsby-plugin-google-gtag`

## 安装步骤

### 1. 切换到 Node 20.x

如果使用 nvm:

```bash
nvm install 20.11.0
nvm use 20.11.0
```

或者直接使用项目的 `.nvmrc`:

```bash
nvm install
nvm use
```

### 2. 清理旧的依赖

```bash
rm -rf node_modules
rm yarn.lock  # 如果使用 yarn
rm package-lock.json  # 如果使用 npm
```

### 3. 安装新的依赖

使用 yarn:

```bash
yarn install
```

或使用 npm:

```bash
npm install
```

### 4. 重新生成 Gatsby 缓存

```bash
npm run clean
# 或
yarn clean
```

### 5. 启动开发服务器

```bash
npm run develop
# 或
yarn develop
```

## 可能需要注意的破坏性变更

### React 18

React 18 引入了一些新特性和变更：

- **自动批处理**: 更多的更新会被自动批处理
- **Strict Mode**: 在开发模式下会双重调用某些生命周期方法
- 如果使用 `ReactDOM.render`，建议迁移到 `createRoot`（Gatsby 已处理）

### Gatsby 5

- 不再支持 Node 14，需要 Node 18+
- 改进了图像处理性能
- GraphQL 查询可能需要更明确的类型定义

### styled-components 6

- 如果你的代码中使用了 styled-components 的高级特性，请参考 [迁移指南](https://styled-components.com/docs/faqs#what-do-i-need-to-do-to-migrate-to-v6)
- 主要变更：移除了一些已弃用的 API

### ESLint 8

- 一些规则可能有更新，可能需要调整 ESLint 配置
- 如果遇到新的 lint 错误，请检查并修复

## 测试清单

升级完成后，请测试以下功能：

- [ ] 开发服务器正常启动 (`npm run develop`)
- [ ] 构建成功 (`npm run build`)
- [ ] 所有页面正常显示
- [ ] 图像加载正常
- [ ] 动画效果正常
- [ ] 样式渲染正确
- [ ] Markdown 内容渲染正常
- [ ] 代码高亮显示正常
- [ ] SEO 相关功能（sitemap, robots.txt）正常

## 回滚方案

如果升级后遇到问题，可以使用 git 回滚：

```bash
git checkout HEAD -- package.json .nvmrc
git clean -fd
nvm use 14.16.0
yarn install
```

## 其他资源

- [Gatsby 5 迁移指南](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v4-to-v5/)
- [React 18 升级指南](https://react.dev/blog/2022/03/08/react-18-upgrade-guide)
- [styled-components v6 发布说明](https://styled-components.com/releases)

## 常见问题

### 错误: error:0308010C:digital envelope routines::unsupported

这是 Node.js 17+ 与 OpenSSL 3.0 相关的常见错误。

**解决方案 1: 完全清理并重新安装（推荐）**

```bash
# 清理所有缓存和依赖
rm -rf node_modules yarn.lock .cache public
yarn cache clean

# 重新安装
yarn install

# 重新构建
yarn clean
yarn develop
```

**解决方案 2: 使用环境变量（临时方案）**

如果上述方法不work，可以在 `package.json` 的 scripts 中添加 Node 选项：

```json
"scripts": {
  "develop": "NODE_OPTIONS='--openssl-legacy-provider' gatsby develop",
  "build": "NODE_OPTIONS='--openssl-legacy-provider' gatsby build"
}
```

或者在命令行中使用：

```bash
NODE_OPTIONS='--openssl-legacy-provider' yarn develop
```

**解决方案 3: 检查 Node 版本**
确保使用的是推荐的 Node 版本：

```bash
node --version  # 应该是 20.x 或 23.x
nvm use  # 使用 .nvmrc 中指定的版本
```

### 依赖安装失败

如果 `yarn install` 失败：

1. 检查网络连接
2. 尝试使用 npm 代替：`npm install`
3. 清理 yarn 缓存：`yarn cache clean`
4. 尝试使用淘宝镜像：
   ```bash
   yarn config set registry https://registry.npmmirror.com
   yarn install
   ```

## 遇到其他问题？

如果升级过程中遇到任何问题，请：

1. 检查本文档中的"常见问题"部分
2. 检查"可能需要注意的破坏性变更"部分
3. 查看控制台错误信息
4. 搜索相关依赖的 GitHub issues
5. 检查 Gatsby 官方文档

祝升级顺利！🚀
