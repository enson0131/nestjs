import 'reflect-metadata';

export const Get = (path: string = ''): MethodDecorator => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    // 方法装饰器
    Reflect.defineMetadata('method', 'GET', descriptor.value);
    Reflect.defineMetadata('path', path, descriptor.value);
  };
};
