import 'reflect-metadata';
import * as express from 'express';
import { Express } from 'express';
import { Logger } from './logger';

export class NestApplication {
  private readonly app: Express = express();
  constructor(protected readonly module) {}

  async init() {
    const controllers = Reflect.getMetadata('controllers', this.module) || [];
    Logger.log(`AppModule dependencies initialized`, 'InstanceLoader');

    for (const Controller of controllers) {
      const controller = new Controller();
      const prefix = Reflect.getMetadata('prefix', Controller) || '/';

      Logger.log(`${Controller.name} {${prefix}}`, 'RoutesResolver');
      const controllerPrototype = Object.getPrototypeOf(controller);

      for (const methodName of Object.getOwnPropertyNames(
        controllerPrototype,
      )) {
        const method = controllerPrototype[methodName];
        const pathMetadata = Reflect.getMetadata('path', method);
        const httpMethod = Reflect.getMetadata('method', method);

        if (!httpMethod) {
          continue;
        }

        // 拼接出完整路由
        const routePath = path.posix.join('/', prefix, pathMetadata);

        this.app[httpMethod.toLowerCase()](routePath, (req, res, next) => {
          const result = method.call(controller, req, res, next);

          res.send(result);
        });

        Logger.log(
          `Mapped {${routePath}, ${httpMethod}} route`,
          'RoutesResolver',
        );
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
      Logger.log(
        `Application is running on http://localhost:${port}`,
        'NestApplication',
      );
    });
  }
}
