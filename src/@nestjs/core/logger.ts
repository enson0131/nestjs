import clc from 'cli-color';

export class Logger {
  static log(message: string, context: string = '') {
    const timestamp = new Date().toLocaleString();
    const pid = process.pid; // 获取当前进程的 pid
    console.log(
      `[${clc.green('Nest')}] [${clc.green(pid.toString())}] -  [${clc.yellow(timestamp)}] - [${clc.blue(context)}] - ${message}`,
    );
  }
}
