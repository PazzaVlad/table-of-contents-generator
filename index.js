"use strict";

const slugify = require("slugify");
/**
 * Ref: https://stackoverflow.com/a/32867186
 *
 * @param {string} content - Content for TOC.
 *
 * @param {object?} config - Config object.
 * @param {string?} config.bbCode - BBCode, that will be replaced by TOC. If not specified – TOC will be added at the beginning of content.
 * @param {string?} config.containerClass - HTML class for TOC container.
 * @param {string?} config.titleClass - HTML class for TOC title.
 * @param {string?} config.title - TOC title.
 *
 */
module.exports = function tableOfContentsGenerator(
  content,
  { bbCode, containerClass = "toc", titleClass = "toc-title", title = "Table of Content", createFromText = false } = {}
) {
  /**
   * If we specify BBCode but it wasn't find in text – just return content earlier.
   */
  if (bbCode && content.indexOf(bbCode) === -1) {
    return content;
  }

  /**
   * State
   */
  let level = 1; // Must be 1 for correct work and valid HTML 5.
  let anchorId = 1;
  let toc = "";
  let output = "";

  // Works only for plain H tags without classes, ids etc.
  const regexp = /<h([\d])>([^<]+)<\/h([\d])>/gi;

  content = content.replace(regexp, (str, openLevel, titleText, closeLevel) => {
    if (openLevel != closeLevel) {
      return str;
    }

    if (openLevel > level) {
      toc += new Array(openLevel - level + 1).join("<ul>");
    } else if (openLevel < level) {
      toc += new Array(level - openLevel + 1).join("</ul>");
    }

    level = parseInt(openLevel);

    const anchor = createFromText ? `${slugify(titleText.toLowerCase())}` : `toc${anchorId++}`;

    toc += `<li><a href="#${anchor}">${titleText}</a>`;

    return `<h${openLevel} id="${anchor}">${titleText}</h${closeLevel}>`;
  });

  if (level > 1) {
    toc += new Array(level + 1).join("</ul>");
  }

  output += toc;

  /**
   * If we find headers - paste TOC to the content.
   */
  if (output) {
    const wrappedToc = `<div class="${containerClass}"><div class="${titleClass}">${title}</div>${output}</div>`;

    /**
     * If we specify BBCode, replace it with TOC. If not – add TOC to beginning of content.
     */
    content = bbCode ? content.replace(bbCode, wrappedToc) : wrappedToc + content;
  }

  return content;
};
