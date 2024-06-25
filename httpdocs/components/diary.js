import { html, css } from '../modules/element.js'
import { Layout } from '../modules/layout.js'
import { chapters } from '../modules/config.js'
import './diary-panel.js'
import './panel.js'
import './entry.js'

const epoch = new Date('2020-12-07')

// Véase https://stackoverflow.com/q/990904
const slugize = (string) => {
  return string
    .trim()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[\u{0100}-\u{FFFF}]/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, '_')
    .replace(/_+/g, '_')
    .replace(/(^_|_$)/g, '')
    .replace(/(^[0-9-])/g, '_$1')
}

class Diary extends Layout {
  static styles = css`
    slot {
      display: block;
      padding: var(--padding);
      flex-grow: 1;
      overflow: scroll;
      scroll-padding-top: var(--padding);
    }
  `

  static html = html`
    <x-panel>
      <x-diary-panel></x-diary-panel>
    </x-panel>
    <slot></slot>
  `

  async connectedCallback() {
    const nav = this.shadowRoot.querySelector('x-diary-panel')

    const main = this.querySelector('main')

    const responses = await Promise.all(
      chapters.map(async (path) => {
        const response = await fetch(`contents/${path}/index.html`)
        const text = await response.text()
        return { path, text }
      })
    )

    this.chapters = responses
      .map(({ path, text }) => {
        const html = new DOMParser().parseFromString(text, 'text/html')
        return { path, html }
      })
      .map(({ path, html }) => {
        const images = html.querySelectorAll('img')
        images.forEach((img) => img.setAttribute('loading', 'lazy'))

        const chapter = html.querySelector('h1').textContent.trim()

        const entries = [...html.querySelectorAll('x-entry')].map((entry) => {
          const h1 = entry.querySelector('h1')
          const datetime = entry.getAttribute('datetime')

          const name = h1.innerHTML.trim()
          const slug = slugize(h1.textContent)
          const week = Math.ceil(
            ((Date.parse(datetime) - epoch) / (60 * 60 * 24 * 1000) + 1) / 7
          )

          entry.setAttribute('id', slug)
          entry.setAttribute('week', week)
          entry.setAttribute('chapter', chapter)
          entry.setAttribute('name', name)

          return entry.outerHTML
        })

        return { path, chapter, entries }
      })

    main.innerHTML += this.chapters
      .map(({ path, chapter, entries }) => {
        const contents = entries.join('')
        return html`
          <section name="${chapter}" path="${path}">${contents}</section>
        `
      })
      .join('<x-separator></x-separator>')

    nav.connectedCallback()
    super.connectedCallback()
  }

  disconnectedCallback() {
    super.disconnectedCallback()
  }
}

customElements.define('x-diary', Diary)

export { Diary }
