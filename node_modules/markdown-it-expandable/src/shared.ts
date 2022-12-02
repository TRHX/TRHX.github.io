import { isSpace } from "markdown-it/lib/common/utils";
import StateBlock from "markdown-it/lib/rules_block/state_block";

export function skipOrderedListMarker(state: StateBlock, startLine: number) {
	let ch;
	const start = state.bMarks[startLine] + state.tShift[startLine];
	let pos = start;
	const max = state.eMarks[startLine];

	// List marker should have at least 2 chars (digit + dot)
	if (pos + 1 >= max) {
		return -1;
	}

	ch = state.src.charCodeAt(pos++);

	if (ch < 0x30 /* 0 */ || ch > 0x39 /* 9 */) {
		return -1;
	}

	for (;;) {
		// EOL -> fail
		if (pos >= max) {
			return -1;
		}

		ch = state.src.charCodeAt(pos++);

		if (ch >= 0x30 /* 0 */ && ch <= 0x39 /* 9 */) {
			// List marker should have no more than 9 digits
			// (prevents integer overflow in browsers)
			if (pos - start >= 10) {
				return -1;
			}

			continue;
		}

		// found valid marker
		if (ch === 0x29 /* ) */ || ch === 0x2e /* . */) {
			break;
		}

		return -1;
	}

	if (pos < max) {
		ch = state.src.charCodeAt(pos);

		if (!isSpace(ch)) {
			// " 1.test " - is not a list item
			return -1;
		}
	}
	return pos;
}

/**
 * Search `[-+*][\n ]`, returns next pos after marker on success
 * or -1 on fail.
 */
export function skipBulletListMarker(state: StateBlock, startLine: number) {
	let pos = state.bMarks[startLine] + state.tShift[startLine];
	const max = state.eMarks[startLine];

	const marker = state.src.charCodeAt(pos++);
	// Check bullet
	if (marker !== 0x2a /* * */ && marker !== 0x2d /* - */ && marker !== 0x2b /* + */) {
		return -1;
	}

	if (pos < max) {
		const ch = state.src.charCodeAt(pos);

		if (!isSpace(ch)) {
			// " -test " - is not a list item
			return -1;
		}
	}

	return pos;
}

export function markTightParagraphs(state: StateBlock, idx: number) {
	let i;
	let l;
	const level = state.level + 2;

	for (i = idx + 2, l = state.tokens.length - 2; i < l; i++) {
		if (state.tokens[i].level === level && state.tokens[i].type === "paragraph_open") {
			state.tokens[i + 2].hidden = true;
			state.tokens[i].hidden = true;
			i += 2;
		}
	}
}
