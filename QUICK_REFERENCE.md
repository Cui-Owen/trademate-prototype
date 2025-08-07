# ⚡ TradeMate 快速命令参考

## 🔥 最常用命令

```bash
# 🚀 快速部署（最常用）
npm run deploy

# 💻 本地开发
npm start

# 🔍 检查SSH状态
ssh -T git@github.com

# 📦 安装依赖
npm install
```

---

## 🛠️ Git操作

```bash
# 查看状态
git status

# 提交所有修改
git add . && git commit -m "Update description"

# 推送到GitHub
git push origin main

# 查看分支
git branch -a

# 查看远程仓库
git remote -v
```

---

## 🔐 SSH相关

```bash
# 检查SSH密钥状态
ssh-add -l

# 重新添加SSH密钥（如果需要）
ssh-add ~/.ssh/id_ed25519

# 测试GitHub连接
ssh -T git@github.com
```

---

## 📊 项目信息

```bash
# 检查Node版本
node --version

# 检查npm版本  
npm --version

# 查看包信息
npm list --depth=0

# 检查过时的包
npm outdated
```

---

## 🌐 有用链接

- **在线演示**: https://Cui-Owen.github.io/trademate-prototype/
- **GitHub仓库**: https://github.com/Cui-Owen/trademate-prototype
- **GitHub Pages设置**: https://github.com/Cui-Owen/trademate-prototype/settings/pages
- **Actions状态**: https://github.com/Cui-Owen/trademate-prototype/actions

---

## 🆘 紧急修复

```bash
# 如果SSH不工作
ssh-add ~/.ssh/id_ed25519

# 如果远程仓库有问题
git remote set-url origin git@github.com:Cui-Owen/trademate-prototype.git

# 如果部署失败
npm run build && npm run deploy

# 重置到最后工作状态
git reset --hard HEAD~1
```

---

**💡 提示**: 保存此文件到书签，随时快速查阅！
