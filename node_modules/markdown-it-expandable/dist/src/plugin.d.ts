import { PluginSimple } from "markdown-it";
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
declare const collapsiblePlugin: PluginSimple;
export default collapsiblePlugin;
