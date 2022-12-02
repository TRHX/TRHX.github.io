import { PluginSimple } from "markdown-it";

import { RuleBlock } from "markdown-it/lib/parser_block";
import { RenderRule } from "markdown-it/lib/renderer";
import StateBlock from "markdown-it/lib/rules_block/state_block";
import Token from "markdown-it/lib/token";
import { classyList } from "./classyList";

/**
 * Adds the `<summary>...</summary>` HTML block
 */
const renderSummary: RenderRule = (tokens, idx, options, env, slf) => {
	return (
		'<summary><span class="pre-summary">&nbsp;</span>' +
		slf.renderInline(tokens[idx].children as Token[], options, env) +
		"</summary>"
	);
};

function isWhitespace(state: StateBlock, start: number, end: number) {
	for (start; start < end; start++) {
		if (!state.md.utils.isWhiteSpace(state.src.charCodeAt(start))) return false;
	}
	return true;
}

const PLUS_MARKER = 43; // +
const RIGHT_CHEVRON_MARKER = 62; // >

/**
 * The core plugin which checks for the appropriate prefix content of
 * either `+++` (for collapsible block in OPEN state) or `>>>` (for
 * collapsible block in CLOSED state).
 */
const coreRule: RuleBlock = (state, startLine, endLine, silent) => {
	let isOpen = true;
	let isClosed = true;

	/** does the block auto close?  */
	let autoClosedBlock = false;
	let start = state.bMarks[startLine] + state.tShift[startLine];
	let max = state.eMarks[startLine];

	if (state.src.charCodeAt(start) !== PLUS_MARKER) {
		isOpen = false;
	}
	if (state.src.charCodeAt(start) !== RIGHT_CHEVRON_MARKER) {
		isClosed = false;
	}
	// if block doesn't start with OPEN or CLOSED character than ignore
	if (!isOpen && !isClosed) return false;

	// Check out the rest of the marker string
	let pos = state.skipChars(start, isOpen ? PLUS_MARKER : RIGHT_CHEVRON_MARKER);

	const markerCount = pos - start;
	if (markerCount < 3) return false;

	/**
	 * these are the characters indicating the beginning (and/or ending) of the
	 * block which will be collapsible.
	 */
	const markup = state.src.slice(start, pos);
	/** the characters of the **summary** section */
	const params = state.src.slice(pos, max).trim();

	// Title must not be empty
	if (isWhitespace(state, pos, max)) return false;

	// The title must not end with the marker (no inline)
	if (
		params.endsWith(
			String.fromCharCode(isOpen ? PLUS_MARKER : RIGHT_CHEVRON_MARKER).repeat(markerCount)
		)
	) {
		return false;
	}

	// Since start is found, we can report success here in validation mode
	if (silent) return true;

	// Search the end of the block
	let nextLine = startLine;
	let isEmpty = true;

	for (;;) {
		nextLine++;

		// Unclosed block should be autoclosed by end of document.
		if (nextLine >= endLine) break;

		start = state.bMarks[nextLine] + state.tShift[nextLine];
		max = state.eMarks[nextLine];

		// Non-empty line with negative indent should stop the list:
		// - ```
		//  test
		if (start < max && state.sCount[nextLine] < state.blkIndent) break;

		if (state.src.charCodeAt(start) !== (isOpen ? PLUS_MARKER : RIGHT_CHEVRON_MARKER)) {
			if (isEmpty) isEmpty = isWhitespace(state, start, max);
			continue;
		}

		// Closing marker should be indented less than 4 spaces
		if (state.sCount[nextLine] - state.blkIndent >= 4) continue;

		pos = state.skipChars(start, isOpen ? PLUS_MARKER : RIGHT_CHEVRON_MARKER);

		// Closing marker must be at least as long as the opening one
		if (pos - start < markerCount) continue;

		// Make sure tail has spaces only
		pos = state.skipSpaces(pos);

		if (pos < max) continue;

		autoClosedBlock = true;
		break;
	}

	if (isEmpty) return false;

	const oldParent = state.parentType;
	const oldLineMax = state.lineMax;
	state.parentType = "reference";

	// This will prevent lazy continuations from ever going past our end marker
	state.lineMax = nextLine;

	const details = isOpen ? `details open` : `details`;

	/** the tokens which make up the  */
	let token = state.push("collapsible_open", details, 1);
	token.block = true;
	token.info = params;
	token.markup = markup;
	token.map = [startLine, nextLine];

	const tokens: Token[] = [];
	state.md.inline.parse(params, state.md, state.env, tokens);
	token = state.push("collapsible_summary", "summary", 0);

	token.content = params;
	token.children = tokens;

	state.md.block.tokenize(state, startLine + 1, nextLine);

	token = state.push("collapsible_close", "details", -1);
	token.markup = state.src.slice(start, pos);
	token.block = true;

	state.parentType = oldParent;
	state.lineMax = oldLineMax;
	state.line = nextLine + (autoClosedBlock ? 1 : 0);

	return true;
};

/**
 * **Collapsible Plugin**
 *
 * Allows markdown authors to create a block of content which can be toggled between
 * an open and closed state. Use `+++` for an open starting state and `>>>` for a
 * closed starting state.
 * ```md
 * +++ My Section (which starts OPEN)
 * - one
 * - two
 * +++
 * ```
 */
const collapsiblePlugin: PluginSimple = (md) => {
	md.block.ruler.before("fence", "collapsible", coreRule, {
		alt: ["paragraph", "reference", "blockquote", "list"],
	});
	md.renderer.rules.collapsible_summary = renderSummary;
	md.block.ruler.before("list", "classy_li", classyList);
};

export default collapsiblePlugin;
