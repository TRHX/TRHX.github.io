interface Options {
    caption?: string;
    firstLine?: number;
    isPreprocess?: boolean;
    lang?: string;
    lineNumber?: boolean;
    mark?: string;
    tab?: string;
    stripIndent?: boolean;
}
declare function PrismUtil(str: string, options?: Options): string;
export = PrismUtil;
