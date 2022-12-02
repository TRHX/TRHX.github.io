# markdown-it-collapsible
![npm](https://img.shields.io/npm/v/markdown-it-expandable) ![Tests](https://github.com/Bioruebe/markdown-it-expandable/workflows/Tests/badge.svg) ![markdown-it](https://img.shields.io/npm/dependency-version/markdown-it-expandable/peer/markdown-it)

> A markdown-it plugin, which adds the HTML `<details>` and `<summary>` elements to allow for expanding and collapsing

## Preview

![preview](docs/preview.png)

## Usage

### Install

```bash
npm install markdown-it-expandable
```

### Enable

```js
const markdown_it = require("markdown-it");
const markdown_it_expandable = require("markdown-it-expandable");
const md = markdown_it().use(markdown_it_expandable, options);
```
### Syntax

- To have your block start in an OPEN state:

    ```md
    +++ Click me!
    Hidden text
    +++
    ```

	which will then be interpreted as:

    ```html
    <details class="expandable" open>
    	<summary>
            <span class="details-marker">
                &nbsp;
            </span>
            Click me!
        </summary>
        <p>
            Hidden text
        </p>
    </details>
    ```

- Alternatively if you wish to start in a CLOSED state:

    ```md
    >>> Click me!
    Hidden text
    >>>
    ```

### Example CSS

```css
details > summary:first-of-type {
	list-style-type: none;
}

::-webkit-details-marker {
	display: none;
}

summary {
	outline: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-khtml-user-select: none;
	-ms-user-select: none;
	cursor: pointer;
}

details > summary .details-marker:before {
	content: "\25BA";
}

details[open] > summary .details-marker:before {
	content: "\25BC";
}

details > *:not(summary) {
	padding-left: 1.25em;
}
```
