const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '../')
const SOURCE_HTML_PATH = path.resolve(__dirname, './color-palette.html')
const OUTPUT_JSON_PATH = `${root}/lib/palette.json`
const OUTPUT_JS_PATH = `${root}/lib/palette.js`

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}

module.exports = function generateJSON($) {
	const html = fs.readFileSync(SOURCE_HTML_PATH, 'utf-8')
	const $colorPallette = $(html)
	const json = {}
	$colorPallette.find('.color-group').each(function(idx){
		const $group = $(this)
		let colorName = $group.find('.main-color .name').text()
		colorName = camelize(colorName)
		json[colorName] = Object.assign({}, json[colorName])

		const $colors = $group.find('.color').not('.main-color')
		$colors.each(function() {
			const shade = $(this).find('.shade').text()
			const hex = $(this).find('.hex').text()
			json[colorName]['shade_' + shade] = hex
		})
	})
	delete json['']
	json['black'] = '#000000'
	json['white'] = '#FFFFFF'

	fs.writeFileSync(OUTPUT_JSON_PATH, JSON.stringify(json, null, 2))
	console.log('Successfully created: lib/palette.json')

	const jsString = `module.exports = ${JSON.stringify(json, null, 2)}`
	fs.writeFileSync(OUTPUT_JS_PATH, jsString)
	console.log('Successfully created: lib/palette.js')
}
