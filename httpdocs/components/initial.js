import { MyElement, html, css } from '../modules/element.js'

class Initial extends MyElement {
  static styles = css`
    :host {
      float: left;
      height: var(--initial-height);
      margin-right: var(--space-small);
      aspect-ratio: 1;
      transform: translate(-4px, 4px);
    }

    svg {
      aspect-ratio: 1;
      /* clip-path: inset(3.5%); */
    }

    svg[viewBox] {
      background: var(--color-initial-flourishes);
      fill: var(--color-background);
    }

    svg path.letter {
      fill: var(--color-highlight);
    }
  `

  static html = ''

  async connectedCallback() {
    const letter = this.getAttribute('letter').toLowerCase()

    const url = new URL(`initials/${letter}.svg`, window.location.origin)
    const response = await fetch(url)
    const text = await response.text()

    // Es preciso concatenar (+=) la respuesta para no sobreescribir los estilos
    // que en `element.js` inyectamos para el particular caso de Safari.
    this.shadowRoot.innerHTML += text
  }
}

customElements.define('x-initial', Initial)

export { Initial }
