# 🚀 TradeMate GitHub Pages 部署指南

## 快速部署步骤

### 1. 创建GitHub仓库
1. 登录GitHub并创建新仓库
2. 仓库名称：`trademate-prototype`
3. 选择"Public"（GitHub Pages需要公开仓库，除非您有Pro账户）
4. **不要**初始化README、.gitignore或LICENSE（我们已经有了）

### 2. 更新配置
编辑`package.json`文件中的homepage字段：
```json
"homepage": "https://YOUR_GITHUB_USERNAME.github.io/trademate-prototype"
```
将`YOUR_GITHUB_USERNAME`替换为您的GitHub用户名。

### 3. 推送代码到GitHub
在终端中运行以下命令：
```bash
# 添加远程仓库
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/trademate-prototype.git

# 推送代码
git push -u origin main
```

### 4. 启用GitHub Pages
1. 进入GitHub仓库页面
2. 点击"Settings"标签
3. 滚动到"Pages"部分
4. 在"Source"下选择"Deploy from a branch"
5. 选择"gh-pages"分支（自动部署后会创建）
6. 点击"Save"

### 5. 等待部署
- GitHub Actions会自动构建和部署您的应用
- 大约2-5分钟后，您的网站将在以下地址可用：
  `https://YOUR_GITHUB_USERNAME.github.io/trademate-prototype/`

## 自动部署工作流

项目包含以下自动化功能：

### GitHub Actions (`.github/workflows/deploy.yml`)
- ✅ 每次推送到`main`分支自动触发
- ✅ 自动安装依赖
- ✅ 自动构建生产版本
- ✅ 自动部署到`gh-pages`分支
- ✅ 支持Node.js 18环境

### 本地部署脚本 (`package.json`)
```bash
# 构建并手动部署
npm run deploy

# 仅构建
npm run build
```

## 验证部署

部署成功后，访问您的GitHub Pages URL应该看到：
- ✅ TradeMate欢迎页面
- ✅ 响应式设计在移动端和桌面端
- ✅ 所有交互功能正常工作
- ✅ 路由导航正常

## 故障排除

### 常见问题

**1. 页面显示404错误**
- 检查GitHub Pages设置是否正确
- 确认`homepage`字段与您的GitHub Pages URL匹配
- 等待几分钟让DNS传播

**2. CSS/JS文件无法加载**
- 确认`homepage`字段正确设置
- 重新构建并部署：`npm run deploy`

**3. 路由不工作（刷新页面显示404）**
- 这是GitHub Pages对SPA的已知限制
- 解决方案：在`public`文件夹添加`404.html`重定向到`index.html`

**4. GitHub Actions失败**
- 检查`.github/workflows/deploy.yml`语法
- 确认仓库有足够权限
- 查看Actions标签下的错误日志

### 高级配置

**自定义域名**
1. 在`public`文件夹添加`CNAME`文件
2. 内容为您的域名（如：`trademate.yourdomain.com`）
3. 在域名提供商设置CNAME记录指向`YOUR_GITHUB_USERNAME.github.io`

**环境变量**
在GitHub仓库Settings > Secrets中添加环境变量：
```
REACT_APP_VERSION=1.0.0
REACT_APP_ENVIRONMENT=production
```

## 更新部署

要更新在线版本：
1. 修改代码
2. 提交更改：`git add . && git commit -m "Your update message"`
3. 推送：`git push origin main`
4. GitHub Actions自动处理其余部署

## 监控和分析

考虑添加以下服务：
- **Google Analytics** - 用户访问分析
- **Hotjar** - 用户行为分析  
- **Lighthouse CI** - 性能监控
- **Sentry** - 错误监控

---

🎉 **恭喜！** 您的TradeMate原型现在已经在线并可供全世界访问！

分享您的演示链接：`https://YOUR_GITHUB_USERNAME.github.io/trademate-prototype/`
