import { MyElement, html, css } from '../modules/element.js'

class Term extends MyElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    a {
      text-transform: uppercase;
      vertical-align: super;
      text-decoration: none;
      color: var(--color-link);
    }

    a.broken {
      background: var(--color-warning);
      color: var(--color-highlight);
    }

    a:hover {
      text-decoration: underline;
    }

    a:before {
      content: '[';
    }

    a:after {
      content: ']';
    }
  `

  static html = html`<a></a>`

  connectedCallback() {
    const a = this.shadowRoot.querySelector('a')
    const href = this.getAttribute('href')

    const id = `#${href}`

    const element = document.querySelector(id)
    a.classList.toggle('broken', !Boolean(element))

    a.setAttribute('href', id)
    a.innerHTML = href
  }
}

customElements.define('x-term', Term)

export { Term }
