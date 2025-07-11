import 'reflect-metadata';

export const Controller = (): ClassDecorator => {
  return (target: any) => {
    // 控制器装饰器
    Reflect.defineMetadata('controller', target, target);
  };
};
