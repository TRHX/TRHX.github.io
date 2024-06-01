import type Context from '../context';
interface InitArgs {
    _: string[];
    install?: boolean;
    clone?: boolean;
}
declare function initConsole(this: Context, args: InitArgs): Promise<void>;
export = initConsole;
