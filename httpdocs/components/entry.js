import { MyElement, html, css } from '../modules/element.js'

class Entry extends MyElement {
  rewritebleTags = ['img[src]', 'x-video[src]', 'x-audio[src]', 'a[href]']

  static html = html`
    <header>
      <time></time>
      <span></span>
      <h1>
        <a></a>
      </h1>
    </header>
    <slot></slot>
  `

  static styles = css`
    :host {
      display: block;
    }

    header {
      margin: auto;
      max-width: var(--line-width-normal);
    }

    header > :is(time, span) {
      display: inline-block;
    }

    header time {
      font-size: var(--type-x-small);
      font-variant: small-caps;
      letter-spacing: 3px;
      transition: var(--delay-large) ease;
      color: var(--color-text-pale);
      opacity: 0;
    }

    header span {
      font-size: var(--type-x-small);
      padding: 0 var(--space-small);
      border-radius: 3px;
      opacity: 0;
    }

    header span a {
      color: var(--color-background);
      font-weight: bold;
      text-decoration: none !important;
    }

    :host(:hover) header :is(time, span) {
      opacity: 1;
      transition-duration: var(--delay-medium);
    }

    header h1 {
      margin: 0;
      font-size: var(--type-xx-large);
      line-height: var(--line-height-condensed);
      color: var(--color-heading);
    }

    header h1 :is(i, em) {
      font-style: normal;
    }

    header h1 a {
      text-decoration: none;
      color: inherit;
    }

    header h1 a:hover {
      text-decoration: 3px dotted underline;
      text-underline-offset: var(--space-x-small);
    }

    @media print, not (hover: hover) {
      header time {
        opacity: 1 !important;
      }
    }
  `

  dateFormat = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }

  connectedCallback() {
    const h1 = this.querySelector('h1')
    const a = this.shadowRoot.querySelector('a')
    const time = this.shadowRoot.querySelector('time')
    const span = this.shadowRoot.querySelector('span')

    const datetime = this.getAttribute('datetime')

    const date = new Date(datetime)

    // time.innerText = date.toLocaleDateString('es-ES', this.dateFormat)

    const title = h1.innerHTML.trim()
    const slug = this.getAttribute('id')

    a.setAttribute('href', `/#${slug}`)
    a.innerHTML = title

    h1.remove()

    this.querySelectorAll('dfn[id]').forEach((dfn) => {
      dfn.outerHTML += `<span class="dfn">${dfn.id}</span>`
    })

    const path = this.closest('section').getAttribute('path')
    const url = new URL(path, document.URL)

    const selector = this.rewritebleTags.join()
    const assets = [...this.querySelectorAll(selector)]

    const pattern = /(?<element>.+)\[(?<attribute>.+)\]/

    assets.forEach((asset) => {
      const { element, attribute } = this.rewritebleTags
        .map((tag) => tag.match(pattern).groups)
        .find(({ element, attribute }) => {
          return (
            element === asset.localName &&
            attribute === asset.attributes[attribute].name
          )
        })

      const value = asset.getAttribute(attribute)
      const isLocal = new URL(value, url).origin === url.origin
      if (isLocal) {
        const { hash } = new URL(value, url)
        const href = hash
          ? new URL(value, url.origin)
          : new URL(`contents${url.pathname}/assets/${value}`, url.origin)

        console.log(asset.getAttribute(attribute))

        asset.setAttribute(attribute, href.href)

        console.log(href.href)

        console.log(asset.getAttribute(attribute))
      }
    })

    const links = [...this.querySelectorAll('a')]

    links.forEach((a) => {
      const href = a.getAttribute('href')
      const { pathname, origin } = new URL(href, url)
      if (origin === url.origin && pathname.match(/.+\.(\w+)$/)) {
        a.setAttribute('href', `${path}/assets/${href}`)
      }
    })
  }
}

customElements.define('x-entry', Entry)

export { Entry }
