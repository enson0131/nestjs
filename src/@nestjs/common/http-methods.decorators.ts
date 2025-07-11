import 'reflect-metadata';

export const Get = (path?: string): MethodDecorator => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    // 方法装饰器
    // Reflect.defineMetadata('GET', path, target);
    console.log(target, propertyKey, descriptor, path);
    // return descriptor.value;
  };
};
