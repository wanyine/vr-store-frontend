## 功能说明
  针对上海锐瞳网络科技有限公司的合作商户，本软体提供了会员认证、游戏检索、运营数据收集与查看等功能。

## 基本架构
  基于Electron + React进行开发

## 如何搭建开发环境
  - 安装nodejs(>= v6.2)
  - npm install
  - npm run dev

## 如何发布
  - 修改 app/package.json中的version属性为指定版本
  - `git tag [version] && git push origin [version] `
  - `npm run release`
  - 打开[标签列表](https://github.com/wanyine/vr-store-frontend/tags),对标签进行编辑，并上传dist中生成的安装包
  - 使用指令 `curl -v http://vr-store-nuts.herokuapp.com/update/win32_x64/[version]/RELEASES` 验证版本服务器是否已经更新版本信息

Copyright (c) 2016 KeenVision.cn All Rights Reserved.
