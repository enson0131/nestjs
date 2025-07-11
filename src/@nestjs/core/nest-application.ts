import * as express from 'express';
import { Express } from 'express';

export class NestApplication {
  private readonly app: Express = express();
  private readonly module: unknown;
  constructor(module: any) {
    this.module = module; // 保存模块
    console.log(this.module); // 打印模块
  }
  async init() {
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
