# google-material-color-palette-json
Google Material Design's Color Palette in JSON format to support code intellisense.
Originally created to use in React / React Native

<img src="https://rawgit.com/sravanrekandar/google-material-color-palette-json/master/src/palette-editor1.png" alt="Drawing" width="200"/>

<img src="https://rawgit.com/sravanrekandar/google-material-color-palette-json/master/src/palette-editor2.png" alt="Drawing" width="200"/>


Color values taken from [Google Material's Color Palette](https://material.google.com/style/color.html#color-color-palette)

# Install
```
npm i -S google-material-color-palette-json
```


# Usage
```
const Palette = require('google-material-color-palette-json')

const bgColor = Palette.red.shade_500 // #F44336
const fgColor = Palette.white // #FFFFFF
```

# UMD Version (Inject through &lt;script /> tag)

```
<script src="google-material-color-palette-json/lib/palette-umd.js"></script>
<script>
  const bgColor = window.PALETTE.red.shade_500 // #F44336
  const fgColor = window.PALETTE.white // #FFFFFF
</script>
```

<img src="https://rawgit.com/sravanrekandar/google-material-color-palette-json/master/lib/table.svg" alt="Drawing" width="821"/>
