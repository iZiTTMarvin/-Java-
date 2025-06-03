# 团队协作开发指南（dev 分支协作流程）

## 1. 克隆仓库
首次参与项目开发时，先克隆仓库到本地：
```bash
git clone git@github.com:iZiTTMarvin/-Java-.git
cd -Java-
```

## 2. 拉取最新的 dev 分支
每次开发前，先确保本地 dev 分支是最新的：
```bash
git checkout dev
git pull origin dev
```

## 3. 新建自己的功能分支（推荐）
避免多人直接在 dev 上开发，建议每个人新建自己的功能分支，如：
```bash
git checkout -b feature/xxx
```
开发完成后，合并到 dev 分支。

## 4. 提交代码
开发完成后，依次执行：
```bash
git add .
git commit -m "简要说明本次提交内容"
git push origin 当前分支名
```

## 5. 合并到 dev 分支
- 推荐在 GitHub 上发起 Pull Request（PR），由项目负责人或团队成员审核后合并到 dev。
- 也可以本地合并后推送（适合小团队）：
  ```bash
  git checkout dev
  git pull origin dev
  git merge feature/xxx
  git push origin dev
  ```

## 6. 拉取最新代码（随时同步）
```bash
git pull origin dev
```

---

## 常见问题解答

### Q: 提交到 dev 分支需要项目负责人同意吗？
**答：**  
- 普通成员如果有权限，可以直接 push 到 dev 分支（如你已设置为协作者）。
- 推荐采用 Pull Request 流程，团队负责人或指定成员审核后再合并，这样更规范、更安全。
- 如果你没有 push 权限，可以 fork 仓库，开发后提交 PR，负责人审核通过后合并。

### Q: 如何防止冲突？
- 每次开发前先 `git pull origin dev` 保证本地代码是最新的。
- 合并冲突时，及时与团队沟通，手动解决冲突后再提交。

### Q: 远程 dev 分支如何保护？
- 可以在 GitHub 仓库设置里为 `dev` 分支开启保护规则，只允许通过 Pull Request 合并，防止误操作。

---

如需更详细的协作流程、分支命名规范、代码评审规范等，请联系项目负责人补充。
