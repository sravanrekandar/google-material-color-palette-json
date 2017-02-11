const path = require('path')
const moduleRoot = path.resolve('./')
const PALETTE = require(moduleRoot)
const PALETTE_JSON = require(`${moduleRoot}/lib/palette.json`)
const PALETTE_UMD = require(`${moduleRoot}/lib/palette-umd`)
const assert = require('assert')
describe('Palette #', () => {
  describe('As node module:', () => {
    it(`PALETTE.red.shade_500 = '#F44336'`, () => {
      assert(PALETTE.red.shade_500 = '#F44336')
    })
    it(`PALETTE.deepPurple.shade_A200 = '#7C4DFF'`, () => {
      assert(PALETTE.deepPurple.shade_A200 = '#7C4DFF')
    })
  })

  describe('As JSON:', () => {
    it(`PALETTE_JSON.red.shade_500 = '#F44336'`, () => {
      assert(PALETTE_JSON.red.shade_500 = '#F44336')
    })
    it(`PALETTE_JSON.deepPurple.shade_A200 = '#7C4DFF'`, () => {
      assert(PALETTE_JSON.deepPurple.shade_A200 = '#7C4DFF')
    })
  })

  describe('As UMD:', () => {
    it(`PALETTE_UMD.red.shade_500 = '#F44336'`, () => {
      assert(PALETTE_UMD.red.shade_500 = '#F44336')
    })
    it(`PALETTE_UMD.deepPurple.shade_A200 = '#7C4DFF'`, () => {
      assert(PALETTE_UMD.deepPurple.shade_A200 = '#7C4DFF')
    })
  })
})
