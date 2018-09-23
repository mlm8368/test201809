const dom = weex.requireModule('dom')

export function setFontFace() {
  dom.addRule('fontFace', {
    'fontFamily': 'SchoolIconFont',
    'src': 'url(\'bmlocal://iconfont/iconfont-school.ttf\')'
  })
}
