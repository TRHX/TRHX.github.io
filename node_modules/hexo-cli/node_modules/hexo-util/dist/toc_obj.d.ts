interface Result {
    text: string;
    id: string;
    level: number;
    unnumbered?: boolean;
}
declare function tocObj(str: string, options?: {}): Result[];
export = tocObj;
