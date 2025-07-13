import 'reflect-metadata';

interface ControllerOptions {
  prefix?: string;
}

export function Controller(): ClassDecorator;
export function Controller(prefix: string): ClassDecorator;
export function Controller(options: ControllerOptions): ClassDecorator;
export function Controller(
  prefixOrOptions?: string | ControllerOptions,
): ClassDecorator {
  let options: ControllerOptions = {};

  if (typeof prefixOrOptions === 'string') {
    options.prefix = prefixOrOptions;
  } else if (prefixOrOptions) {
    options = prefixOrOptions;
  }

  return (target: Function) => {
    // 控制器装饰器
    Reflect.defineMetadata('prefix', options.prefix || '', target);
  };
}
