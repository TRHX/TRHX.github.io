import logger from 'hexo-log';
import Promise from 'bluebird';
import ConsoleExtend from './extend/console';
type Callback = (err?: any, value?: any) => void;
declare class Context {
    base_dir: string;
    log: ReturnType<typeof logger>;
    extend: {
        console: ConsoleExtend;
    };
    version?: string | null;
    constructor(base?: string, args?: {});
    init(): void;
    call(name: string, args: object, callback?: Callback): any;
    call(name: string, callback?: Callback): any;
    exit(err?: Error): Promise<void>;
    unwatch(): void;
}
export = Context;
