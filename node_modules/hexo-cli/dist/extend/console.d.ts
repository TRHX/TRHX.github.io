import type { Options, Callback, Store, Alias } from '../types';
declare class Console {
    store: Store;
    alias: Alias;
    constructor();
    get(name: string): Callback;
    list(): Store;
    register(name: string, desc: string, options: Options, fn: Callback): void;
    register(name: string, options: Options, fn: Callback): void;
    register(name: string, desc: string, fn: Callback): void;
    register(name: string, fn: Callback): void;
}
export = Console;
