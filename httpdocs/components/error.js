import { MyElement, html, css } from '../modules/element.js'
import './button.js'

class Error extends MyElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      padding: var(--padding);
      gap: var(--space-small);
    }

    h1,
    h2 {
      margin: 0;
      line-height: var(--line-height-condensed);
    }

    h1 {
      font-size: var(--type-xxx-large);
      color: var(--color-highlight);
    }

    h2 {
      font-size: var(--type-x-large);
    }

    x-button {
      margin-top: var(--space-xx-large);
    }
  `

  static html = html`
    <h1>Página no&nbsp;encontrada</h1>
    <h2>El contenido solicitado no existe.</h2>
    <x-button href="/">Ir a la portada</x-button>
  `
}

customElements.define('x-error', Error)

export { Error }
