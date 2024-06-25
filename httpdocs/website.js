import { styles, item } from './modules/config.js'

import './components/diary.js'
import './components/error.js'

import './components/aside.js'
import './components/columns.js'
import './components/details.js'
import './components/initial.js'
import './components/media.js'
import './components/separator.js'
import './components/table.js'
import './components/term.js'
import './components/theme-switcher.js'
import './components/video.js'

new EventSource('/esbuild').addEventListener('change', () => location.reload())

try {
  const stylesheet = new CSSStyleSheet()
  stylesheet.replace(styles)
  document.adoptedStyleSheets = [stylesheet]
} catch {
  // For Safari
  // See https://caniuse.com/?search=adoptedStyleSheets
  document.head.innerHTML += `<style>${styles}</style>`
}

const folder = item.id ? (item.date_published ? 'posts' : 'pages') : 'diary'
const tag = item._jaime?.element ?? 'x-post'

const path = item.id ? `/contents/${folder}/${item.id}` : `/contents/${folder}`

const base = item.id ? `${path}/assets/` : '/'

const response = await fetch(`${path}/index.html`)
const text = await response.text()

const element = document.createElement(tag)

element.innerHTML = `<main>${text}</main>`
element.classList.add('container')
element.item = item

document.documentElement.setAttribute('lang', item.language)

document.title = item.title

document.head
  .querySelector('meta[name=description]')
  .setAttribute('content', item.content_text)

document.head
  .querySelector('meta[property="og:title"]')
  .setAttribute('content', item.title)

document.head
  .querySelector('meta[property="og:description"]')
  .setAttribute('content', item.content_text)

document.head
  .querySelector('meta[property="og:url"]')
  .setAttribute('content', item.url)

document.head
  .querySelector('meta[property="og:type"]')
  .setAttribute('content', item.date_published ? 'article' : 'website')

document.head.querySelector('base').setAttribute('href', base)

document.body.append(element)
