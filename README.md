Node.js server side Table of Content (TOC) generator. Produce valid HTML5 code. 

## Examples
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

makeToc(content, {
  bbCode: '[TOC]',
  containerClass: 'my-toc',
  titleClass: 'my-toc-title',
  title: 'Содержание',
})
```
**Output:**
```html
  <p>Long long long text</p>
  <div class="my-toc"><div class="my-toc-title">Содержание</div><ul><li><a href="#toc1">Some title</a><li><a href="#toc2">Other Title</a><ul><li><a href="#toc3">Sub title 1</a><li><a href="#toc4">Sub title 2</a></ul><li><a href="#toc5">Title</a></ul></ul></div>
  <h2 id="toc1">Some title</h2>
  <p>Long long long text</p>
  <h2 id="toc2">Other Title</h2>
  <p>Long long long text</p>
  <p>Long long long text</p>
  <h3 id="toc3">Sub title 1</h3>
  <p>Long long long text</p>
  <h3 id="toc4">Sub title 2</h3>
  <p>Long long long text</p>
  <h2 id="toc5">Title</h2>
  <p>Long long long text</p>
```
- If we pass null to *config.bbCode* – it **always** generates TOC at the beginning of *content*.
- If we pass some string to *config.bbCode* – it **only** generates TOC **if** *content* contains this BBCode. And if it finds BBCode, then TOC will be paste in place of this BBCode.