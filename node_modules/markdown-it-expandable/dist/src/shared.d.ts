import StateBlock from "markdown-it/lib/rules_block/state_block";
export declare function skipOrderedListMarker(state: StateBlock, startLine: number): number;
/**
 * Search `[-+*][\n ]`, returns next pos after marker on success
 * or -1 on fail.
 */
export declare function skipBulletListMarker(state: StateBlock, startLine: number): number;
export declare function markTightParagraphs(state: StateBlock, idx: number): void;
