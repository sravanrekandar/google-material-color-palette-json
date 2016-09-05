const fs = require('fs')


module.exports = function generateJSON($) {
	const html = fs.readFileSync('./color-palette.html', 'utf-8')
	const $colorPallette = $(html)
	const json = {}
	$colorPallette.find('.color-group').each(function(idx){
		const $group = $(this) 
		const colorName = $group.find('.main-color .name').text()

		json[colorName] = Object.assign({}, json[colorName])

		const shades = {}
		const $colors = $group.find('.color').not('.main-color')
		$colors.each(function(){
			const shade = $(this).find('.shade').text()
			const hex = $(this).find('.hex').text()
			shades[shade] = hex

		})
		json[colorName].shades = shades

	})
	delete json['']
	fs.writeFileSync('./color-palette.json', JSON.stringify(json, null, 2))
	console.log('Successfully created: color-pallette.json')
}