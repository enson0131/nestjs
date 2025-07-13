import 'reflect-metadata';
import * as express from 'express';
import { Express } from 'express';

export class NestApplication {
  private readonly app: Express = express();
  constructor(protected readonly module) {}

  async init() {
    const Controllers = Reflect.getMetadata('controllers', this.module) || [];

    for (const Controller of Controllers) {
      const controller = new Controller();
      const prefix = Reflect.getMetadata('prefix', Controller) || '/';
      console.log(`prefix--->`, prefix);

      console.log(
        `controller-->111`,
        Object.getOwnPropertyNames(Object.getPrototypeOf(controller)),
      );
      for (const action of Object.getOwnPropertyNames(
        Object.getPrototypeOf(controller),
      )) {
        if (action === 'constructor') {
          continue;
        }

        if (typeof controller[action] !== 'function') {
          continue;
        }

        const path = Reflect.getMetadata('path', controller[action]) || '/';
        const method = Reflect.getMetadata('method', controller[action]);
        console.log(`action--->`, action);
        console.log(`path--->`, path);
        console.log(`method--->`, method);
      }
    }
    // 初始化应用
    // 1. 加载模块
    // 2. 加载中间件
    // 3. 加载路由
    // 4. 加载配置
    // 5. 加载数据库
    // 6. 加载缓存
  }

  async listen(port: number) {
    await this.init();
    // 调用 express 实例的 listen 方法，启动服务
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}
