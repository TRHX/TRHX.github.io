import { describe, expect, it  } from "vitest";
import mdi from "markdown-it";
import collapse from "~/plugin";

describe("markdown-it-collapsible", () => {
	const md = new mdi().use(collapse);
	
	it("using +++ starts out OPEN", () => {
		const result = md.render(`
# Hello
+++ this is my section
- one
- two
- three
+++
		`);
		
		expect(/<details open>/.test(result)).toBeTruthy();
	});

	
	it("using ++> starts out CLOSED", () => {
		const result = md.render(`
# Hello
>>> this is my section
- one
- two
- three
>>>
`);
		expect(/<details>/.test(result)).toBeTruthy();
		
	});

	
		it("nested expandable list and sub-list", () => {
			const result = md.render(`
# Hello
- one
- >>> two
	- 2a
	- 2b
	- +++ 2c
- three
`);
			const twoLineItem = /<li class="lvl-[0-9]+ expandable">\s*<details>\s*<summary>\s*<span .*<\/span>\s*two/;
			expect(twoLineItem.test(result)).toBeTruthy();
		});
	
});
