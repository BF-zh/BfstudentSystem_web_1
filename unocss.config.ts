import { defineConfig, presetAttributify, presetIcons, presetUno, presetWind, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetWind(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
        'width': '2em',
        'height': '2em',
      },
    }),
    presetAttributify(),
  ],
  transformers: [transformerDirectives()],
  rules: [
    [/^(?:line|l)-(?:h|height)-(.+)$/, ([,height]) => ({ 'line-height': `${height}` })],
    [/^(?:line|l)-(?:h|height)-(\d+)$/, ([,height]: any) => ({ 'line-height': `${height / 4}em` })],
    ['p-md', { padding: '15px' }],
    ['m-md', { margin: '15px' }],
  ],
})
