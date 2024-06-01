declare function htmlTag(tag: string, attrs?: {
    [key: string]: string | boolean | number | null | undefined;
}, text?: string, escape?: boolean): string;
export = htmlTag;
