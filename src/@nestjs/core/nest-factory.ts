import { NestApplication } from './nest-application';

export class NestFactory {
  static create(module: any): Promise<NestApplication> {
    const app = new NestApplication(module); // 创建应用实例
    return Promise.resolve(app); // 访问 nest 实例
  }
}
