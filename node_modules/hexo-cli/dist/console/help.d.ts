import type Context from '../context';
interface HelpArgs {
    _: string[];
    v?: boolean;
    version?: boolean;
    consoleList?: boolean;
    completion?: string;
}
declare function helpConsole(this: Context, args: HelpArgs): any;
export = helpConsole;
