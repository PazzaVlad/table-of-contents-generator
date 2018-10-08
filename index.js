'use strict'

/**
 * Ref: https://stackoverflow.com/a/32867186
 * 
 * @param {string} html - html for TOC.
 */
module.exports = function tableOfContentsGenerator(html) {
  /**
   * State
   */
  let level = 1 // Must be 1 for correct work and valid HTML 5.
  let anchorId = 1
  let toc = ''
  let output = ''

  // Works only for plain H tags without classes, ids etc.
  const regexp = /<h([\d])>([^<]+)<\/h([\d])>/gi
  
  html = 
    html.replace(regexp, (str, openLevel, titleText, closeLevel) => {
      if (openLevel != closeLevel) {
          return str
      }

      if (openLevel > level) {
        toc += (new Array(openLevel - level + 1)).join("<ul>")
      } else if (openLevel < level) {
        toc += (new Array(level - openLevel + 1)).join("</ul>")
      }

      level = parseInt(openLevel)

      const anchor = 'toc' + anchorId++

      toc += `<li><a href="#${anchor}">${titleText}</a>`

      return `<h${openLevel} id="${anchor}">${titleText}</h${closeLevel}>`
    }
  )

  if (level > 1) {
    toc += (new Array(level + 1)).join('</ul>')
  }

  output += toc
  
  return output 
}