import { MyElement, html, css } from '../modules/element.js'

class Button extends MyElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    a {
      padding: var(--space-x-small) var(--space-medium);
      font-weight: bold;
      border: 1px solid var(--color-accent);
      border-radius: 1em;
      text-decoration: none;
      color: var(--color-accent) !important;
      text-align: center;
      transition: var(--delay-large) ease;
    }

    a::after {
      display: none;
    }

    a:hover {
      border-color: var(--color-accent);
      background: var(--color-accent) !important;
      color: var(--color-background) !important;
      transition-duration: var(--delay-medium);
      text-decoration: none;
    }
  `

  static html = html`
    <a>
      <slot></slot>
    </a>
  `

  connectedCallback() {
    const a = this.shadowRoot.querySelector('a')

    const href = this.getAttribute('href')
    a.setAttribute('href', href)
  }
}

customElements.define('x-button', Button)

export { Button }
