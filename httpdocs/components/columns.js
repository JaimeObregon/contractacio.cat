import { MyElement, html, css } from '../modules/element.js'

class Columns extends MyElement {
  static styles = css`
    :host {
      display: flex;
      justify-content: space-between;
      margin: 0;
      gap: var(--space-medium);
      justify-content: center;
      align-items: flex-start;
    }

    :host([wide]) {
      max-width: var(--line-width-wide) !important;
      gap: var(--space-x-large);
    }

    ::slotted(*) {
      width: 50%;
    }

    @media screen and (max-width: 640px) {
      :host {
        flex-direction: column;
      }

      ::slotted(*) {
        width: 100%;
      }
    }
  `

  static html = html`<slot></slot>`
}

customElements.define('x-columns', Columns)

export { Columns }
