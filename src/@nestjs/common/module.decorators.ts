import 'reflect-metadata';

interface ModuleMetadata {
  imports?: any[];
  controllers?: any[];
  providers?: any[];
  exports?: any[];
}

export const Module = (metadata: ModuleMetadata): ClassDecorator => {
  // 类装饰器
  return (target: any) => {
    // 将属性装饰器应用到目标对象上
    Reflect.defineMetadata('module', metadata, target);
  };
};
