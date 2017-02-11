const $ = require('jQuery')
const Palette = require('google-material-color-palette-json')
const copy = require('copy-to-clipboard')

const stringify = require('stringify');

stringify.registerWithRequire({
  appliesTo: { includeExtensions: ['.svg'] },
  minify: true,
  minifyAppliesTo: {
    includeExtensions: ['.html']
  },
  minifyOptions: {
    // html-minifier options
  }
})

// const svgText = require('google-material-color-palette-json/lib/table.svg')

function createItem(title, colorValue) {
	return $(
		`
		<div class="box-container">
			<div class="box" style="background-color: ${colorValue}" title="${title}" data-value="${colorValue}">
			</div>
		</div>
		`
	)
}

function createColorBoxes() {
	Object.keys(Palette).forEach((color) => {
		let title = ''
		let colorValue = ''
		let colorSection = $('<div class="color-section" />')
		if(typeof Palette[color] === 'string') {
			title = `Palette.${color}`
			colorValue = Palette[color]
			domItem = createItem(title, colorValue)
			colorSection.append(domItem)
		} else {
			Object.keys(Palette[color]).forEach((shade) => {
				title = `Palette.${color}.${shade}`
				colorValue = Palette[color][shade]
				domItem = createItem(title, colorValue)
				colorSection.append(domItem)
			})
		}
		$('#colors').append(colorSection)
	})
}

function init() {
	createColorBoxes()
	$(document).on('click', '.box-container', function(){
		const title = $(this).find('.box').attr('title')
		copy(title)
		$('#clipboard').text(title)
	})
	$(document).on('dblclick', '.box-container', function(){
		const value = $(this).find('.box').data('value')
		copy(value)
		$('#clipboard').text(value)
	})
}
init()