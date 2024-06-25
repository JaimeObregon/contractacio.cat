import { MyElement, html, css } from '../modules/element.js'

class Table extends MyElement {
  static styles = css`
    :host {
      display: block;
    }

    div {
      width: 100%;
      overflow: scroll;
    }

    div table {
      margin: auto;
      white-space: nowrap;
      font-size: var(--type-small);
      border-spacing: var(--space-medium) 0;
    }

    div table th {
      color: var(--color-highlight);
      font-variant-caps: small-caps;
    }

    div table thead th {
      border-bottom: 1px solid var(--color-line);
    }

    div table :is(th, td) {
      vertical-align: top;
    }

    div table :is(th, td).numeric {
      text-align: right;
      font-variant-numeric: tabular-nums;
    }

    div table tbody + tbody:not(:first-of-type) th {
      padding-top: var(--space-x-large);
      vertical-align: bottom;
    }
  `

  static html = html`
    <div>
      <table></table>
    </div>
  `

  connectedCallback() {
    const table = this.shadowRoot.querySelector('table')
    table.outerHTML = this.innerHTML
    this.innerHTML = ''
  }
}

customElements.define('x-table', Table)

export { Table }
