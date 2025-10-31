# 将项目推送到 GitHub 远程仓库指南

目标仓库：https://github.com/iZiTTMarvin/-Java-

前置要求
- 已安装 Git，并可在命令行使用。
- 已登录 GitHub 或准备好 Personal Access Token（推荐使用 Git Credential Manager 弹窗登录）。

步骤
1) 确认忽略项（防止上传无关文件）
- 本仓库已忽略：node_modules、dist、编辑器配置、系统文件等；并单独忽略了 vue-frontend/dist/ 与 1.docx。
- 如需额外忽略，请编辑根目录 .gitignore。

2) 关联远程并推送（在仓库根目录执行）
```bash
git status --porcelain
# 确认仅包含需要提交的变更

# 设置/更新远程地址为目标仓库
git remote get-url origin && git remote set-url origin https://github.com/iZiTTMarvin/-Java- || git remote add origin https://github.com/iZiTTMarvin/-Java-

# 如 1.docx 已被跟踪，取消跟踪（已在 .gitignore 中忽略）
git ls-files --error-unmatch 1.docx && git rm --cached 1.docx || echo "1.docx not tracked"

# 选择或创建分支（默认 main）
git branch --show-current || git checkout -b main

# 提交并推送
git add -A
git commit -m "docs: 项目介绍与推送指南; feat: UI 美化与本地接口完善; chore: 更新 .gitignore" || echo "nothing to commit"
git push -u origin $(git branch --show-current)
```

3) 认证方式
- 首次 push 时可能弹出 Git Credential Manager 登录窗口；按提示登录 GitHub 账号授权即可。
- 或使用 PAT：当命令行提示输入密码时，将 PAT 粘贴为密码。

常见问题
- 推送被拒绝：远程有更新，先 `git pull --rebase origin <branch>` 再推送。
- 未设置用户名/邮箱：`git config user.name "YourName" && git config user.email "you@example.com"`。
- 忽略无效：若文件已被跟踪，需 `git rm --cached <file>` 取消跟踪后再提交。
