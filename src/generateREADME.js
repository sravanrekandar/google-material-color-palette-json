const fs = require('fs')
const path = require('path')

const README_PATH = path.resolve(__dirname, '../README.md')
const NOTES_PATH = path.resolve(__dirname, './notes.md')
const DEMO_HTML_PATH = path.resolve(__dirname, '../lib/demo-html.md')

module.exports = function(){
  const notes = fs.readFileSync(NOTES_PATH, 'utf-8')
  const demoHTML = fs.readFileSync(DEMO_HTML_PATH, 'utf-8')

  fs.writeFileSync(README_PATH, notes + demoHTML)
}
