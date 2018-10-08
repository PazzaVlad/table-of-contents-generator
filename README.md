# Table of Contents Generator

Fast Node.js server side Table of Content (TOC) generator. Produce valid HTML5 code. 

## Usage

```js
const makeToc = require('table-of-contents-generator')

const content = `
  <p>Long long long text</p>
  [TOC]
  <h2>Some title</h2>
  <p>Long long long text</p>
  <h2>Other Title</h2>
  <p>Long long long text</p>
  <p>Long long long text</p>
  <h3>Sub title 1</h3>
  <p>Long long long text</p>
  <h3>Sub title 2</h3>
  <p>Long long long text</p>
  <h2>Title</h2>
  <p>Long long long text</p>
`

const toc = makeToc(content)
```
**Output:**
```html
<ul><li><a href="#toc1">Some title</a><li><a href="#toc2">Other Title</a><ul><li><a href="#toc3">Sub title 1</a><li><a href="#toc4">Sub title 2</a></ul><li><a href="#toc5">Title</a></ul></ul>
```

Returns empty string if headings is not found.

## License

MIT