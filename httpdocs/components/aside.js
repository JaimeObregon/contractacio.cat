import { MyElement, html, css } from '../modules/element.js'

class Aside extends MyElement {
  static styles = css`
    :host {
      display: block;
      float: left;
      width: 50%;
      margin: 0 var(--space-small) var(--space-small) 0;
    }

    ::slotted(h3) {
      font-size: var(--type-x-large);
      font-style: italic;
      line-height: var(--line-height-condensed);
      color: var(--color-highlight);
      margin: 0 var(--space-small) var(--space-small) 0;
    }

    @media (max-width: 768px) {
      :host {
        float: none;
        width: 100%;
        max-width: var(--line-width-normal);
        margin: var(--space-large) auto !important;
      }
    }
  `

  static html = html`<slot></slot>`
}

customElements.define('x-aside', Aside)

export { Aside }
