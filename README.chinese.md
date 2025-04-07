## 目标读者

- 纯前端开发者：
    希望了解请求接口后的全链路流程，了解后端的主要工作内容以便在日常对接中能更好的沟通（battle）
- NestJS感兴趣者：
    你可能了解过NestJS的核心概念，这个项目将有助于你的实践
- 全栈开发者：
    二次开发/直接复用消息中心模块与权限设计方案

## 概述

企业级NestJS入门项目 —— 一个完整的消息中心后台系统 —— 基于TypeORM + MySQL + JWT + RBAC + Pino日志 + Swagger接口文档
### 主要功能和特性包括：
- 用户管理：​实现了用户的注册、登录功能，并通过 JWT 进行身份验证，确保系统的安全性

- 权限控制：​采用 RBAC（基于角色的访问控制）模型，实现了细粒度的权限管理，确保不同角色的用户只能访问其被授权的资源

- 消息管理：​提供了完整的消息 CRUD 接口，支持消息的创建、获取、修改和删除操作

- 日志记录：​集成了 Pino 日志系统，实现了高效、结构化的日志记录，便于问题的追踪和调试

- 接口文档：​通过集成 Swagger，自动生成了 API 文档，方便前后端协作和测试

- 环境变量配置：​支持通过环境变量进行配置，方便在不同环境下进行部署和调试

- 数据库设计：​使用 MySQL 作为数据库，结合 TypeORM 进行数据库操作，支持复杂的数据关系和操作，如主键、外键、联合主键、联表查询、唯一索引、级联删除等

- 数据安全：​对敏感数据进行了脱敏存储，确保用户数据的安全性

### 项目结构
```
src/
├── authentication/           # 用户注册、登录验证
├── decorator/                # 自定义装饰器
├── enum/                     # 一些枚举类型
├── guards/                   # 守卫
├── message/                  # 消息管理模块
├── users/                    # 用户管理模块
├── app.module.ts             # 应用主模块
└── main.ts                   # 应用入口
```


## 环境要求
- Node.js 20.x +
- [MySQL 8.x +](https://downloads.mysql.com/archives/community/)
- [`pnpm包管理工具`](https://pnpm.io/zh/)


## 启动项目

### 1、配置环境变量
设置DB_USER、DB_PASSWORD和JWT_SECRET等字段

### 2、创建数据库

#### 登录MySQL
```bash
$ mysql -u root -p
```
#### 创建数据库
```sql
CREATE DATABASE message_center;
-- 开发模式下表结构无需手动创建，TypeORM会自动同步
```

### 3、安装依赖
```bash
$ pnpm install
```

### 4、编译和运行项目

```bash
# 开发模式
$ pnpm run start:dev

# 生产模式
$ pnpm run start:prod
```

## API访问入口
启动项目后访问Swagger文档：
http://localhost:3000/api

## 贡献
欢迎提PR  
🐛有任何问题请提issue，附带可复现步骤