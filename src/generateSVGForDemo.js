const path = require('path')
const fs = require('fs')
const hbs = require('handlebars')
const camelize = require('./utils').camelize

const SOURCE_HTML_PATH = path.resolve(__dirname, './color-palette.html')
const SVG_TEMPLATE_PATH = path.resolve(__dirname, 'svg-template.txt')
const SVG_OUT_PUT_PATH = path.resolve(__dirname, '../lib/table.svg')

const svgTemplate = hbs.compile(fs.readFileSync(SVG_TEMPLATE_PATH, 'utf-8'))

const titleRowTemplate = hbs.compile(
`
<g class="color-title-row">
  <rect width="400" height="127" fill="{{value}}">
  </rect>
  <text class="title" x="10" y="10" alignment-baseline="hanging" fill="#FFF">{{name}}</text>
  <text class="shade" x="10" y="117" fill="{{textColor}}">{{name}}.shade_500</text>
  <text class="shade" x="390" y="117"  text-anchor="end" fill="{{textColor}}">{{value}}</text>
</g>
`)

const rowTemplate = hbs.compile(
`
<g class="color-row" transform="translate(0, {{y}})">
  <rect width="400" height="44" fill="{{value}}"></rect>
  <text class="shade" x="10" y="22" alignment-baseline="middle" fill="{{textColor}}">{{name}}</text>
  <text class="shade" x="390" y="22" alignment-baseline="middle" text-anchor="end" fill="{{textColor}}">{{value}}</text>
</g>
`
)

function createColorRow(data){
	return rowTemplate(data)
}

function createTitleRow(data){
  console.log(data)
	return titleRowTemplate(data)
}

module.exports = function($){
  const Palette = require('../lib/palette.json')
  const html = fs.readFileSync(SOURCE_HTML_PATH, 'utf-8')
	const $colorPallette = $(html)
	const json = {}
	const $colorSetsGroup = $('<g class="color-groups"></g>')
	let colorSetX = 0
	let colorSetY = 0
	const ROW_HEIGHT = 44
	const ROW_WIDTH = 400
	const TITLE_ROW_HEIGHT = 127

	const $colorGroups = $colorPallette.find('.color-group')
	$colorGroups.each(function(groupIndex){
		const $group = $(this)
		const $colorTitleContainer = $group.find('.main-color .name')
		const isDarkColor = !($colorTitleContainer.hasClass('light-strong'))
		let colorName = camelize($colorTitleContainer.text())
		const $colors = $group.find('.color').not('.main-color')

    // To place the containers side by side
		colorSetX = (groupIndex % 2 === 0) ? 0 : (ROW_WIDTH + 20)
		const $colorSet = $(`<g class="color-set ${colorName}" transform="translate(${colorSetX}, ${colorSetY})"/>`)
		let colorRowY = 0

		// Title row
		if(typeof Palette[camelize(colorName)] === 'object'){
			$colorSet.append(createTitleRow({
				name: `Palette.${colorName}`,
				value: Palette[camelize(colorName)].shade_500.toUpperCase(),
				y: colorRowY,
				textColor: isDarkColor ? '#FFF': '#000',
			}))
			colorRowY = colorRowY + TITLE_ROW_HEIGHT
		}

		$colors.each(function(index) {
			const shade = $(this).find('.shade').text()
      const isDarkColor = !($(this).hasClass('dark'))
      const isDividedColor = ($(this).hasClass('divide'))
			const hex = $(this).find('.hex').text()

			colorRowY = colorRowY + (isDividedColor ? 2 : 0)
			$colorSet.append(createColorRow({
				name: `Palette.${colorName}.shade_${shade}`,
				value: hex.toUpperCase(),
				y: colorRowY,
				textColor: isDarkColor ? '#FFF': '#000',
			}))
			colorRowY = colorRowY + ROW_HEIGHT

			$colorSetsGroup.append($colorSet)
		})
		if(groupIndex % 2 === 1) {
			colorSetY = colorSetY + TITLE_ROW_HEIGHT + (14 * ROW_HEIGHT) + 30
		}
	})
	fs.writeFileSync(SVG_OUT_PUT_PATH, svgTemplate({content: $colorSetsGroup.html()}))
	console.log('Successfully created: lib/table.svg')
}
