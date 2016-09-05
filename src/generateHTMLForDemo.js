const fs = require('fs')
const path = require('path')
const DEMO_HTML_PATH = path.resolve(__dirname, '../lib/demo-html.md')
module.exports = function generateHTMLForDemo($, json) {
  const $container = $('<div></div>')
  Object.keys(json).forEach((colorName) => {
    const $table = $('<table><tbody></tbody></table>')
    const $tbody = $table.find('tbody')

    if(typeof json[colorName] === 'string') {
        const $tr = $(
          '<tr>' +
          '<td>' + colorName + ' = ' + json[colorName] + '</td>' +
          '<td style="background-color:' + json[colorName] + '; width: 200px"></td>' +
          '</tr>'
        )
        $tbody.append($tr)
    } else {
      Object.keys(json[colorName]).forEach((shade) => {
        const color = json[colorName]
        const $tr = $('<tr />')
        $tr.append('<td>' + colorName + '.' + shade + ' = ' + color[shade] + '</td>')
        $tr.append('<td style="background-color:' + color[shade] + '; width: 200px">&nbsp;</td>')
        $tbody.append($tr)
      })
    }

    $container.append($table)
  })

  fs.writeFileSync(DEMO_HTML_PATH, $container.html())
}
