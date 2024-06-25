import { MyElement, html, css } from '../modules/element.js'

class DiaryPanel extends MyElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      padding: var(--panel-padding);
      gap: var(--panel-padding);
      line-height: var(--line-height-condensed);
    }

    a {
      color: inherit !important;
      text-decoration: none !important;
    }

    a:not(.visible):hover {
      color: var(--color-link);
      text-decoration: underline !important;
    }

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    section#pinned ul {
      display: flex;
      flex-direction: column;
      gap: var(--space-x-small);
    }

    section#pinned ul li {
      display: flex;
      padding: 0;
      gap: var(--space-small);
      font-size: var(--type-small);
    }

    section#pinned ul li::before {
      display: none;
    }

    section#pinned ul li svg {
      display: inline-block;
      flex-shrink: 0;
      width: 1em;
      aspect-ratio: 1;
      fill: currentColor;
      transform: rotate(-45deg);
    }

    section#chapters {
      display: flex;
      flex-direction: column;
      gap: var(--space-medium);
      margin-left: var(--space-x-small);
    }

    section#chapters details[open] {
      margin-bottom: var(--space-large);
    }

    section#chapters details summary {
      position: relative;
      font-variant-caps: small-caps;
      font-weight: bold;
      cursor: pointer;
      color: var(--color-highlight);
    }

    section#chapters details summary:hover {
      color: var(--color-highlight);
    }

    section#chapters details summary span {
      position: absolute;
      left: var(--space-medium);
    }

    section#chapters details div {
      display: flex;
      flex-direction: column;
      margin-left: var(--space-medium);
    }

    section#chapters details div h2 {
      margin: var(--space-medium) 0 0 0;
      font-size: var(--type-x-small);
      font-weight: lighter;
      color: var(--color-text-pale);
      font-variant-caps: all-small-caps;
      letter-spacing: 1px;
    }

    section#chapters details div nav {
      font-size: var(--type-small);
      line-height: var(--line-height-normal);
    }

    section#chapters details div nav a {
      transition: var(--delay-large) ease;
      text-underline-offset: var(--space-x-small);
      padding: 0 var(--space-x-small);
      margin: 0 calc(-1 * var(--space-x-small));
    }

    section#chapters details div nav a:hover {
      text-decoration: 0.075em solid underline !important;
      transition-duration: var(--delay-medium);
    }

    section#chapters details div nav a :is(i, em) {
      font-style: italic;
    }

    section#chapters details div nav a cite {
      font-style: normal;
      font-variant: small-caps;
    }

    section#chapters details div nav a.pinned {
      text-decoration: underline 1px dashed !important;
    }

    section#chapters details div nav a.pinned:hover {
      text-decoration: underline !important;
    }

    section#chapters details div nav a.visible {
      background: var(--color-highlight);
      color: var(--color-highlight-inverted) !important;
      text-decoration: none !important;
    }

    section#chapters details div nav span {
      display: inline-block;
      margin: 0 var(--space-small);
      color: var(--color-text-pale);
    }
  `

  static html = html`
    <section id="pinned">
      <ul></ul>
    </section>
    <slot></slot>
    <section id="chapters"></section>
  `

  highlightVisible(entries) {
    const section = this.shadowRoot.querySelector('section#chapters')
    entries.forEach((entry) => {
      const slug = entry.target.getAttribute('id')
      const selector = `a[href='#${slug}']`
      const a = section.querySelector(selector)
      a.classList.toggle('visible', entry.isIntersecting)
    })

    const visible = this.shadowRoot.querySelector('a.visible')

    if (visible) {
      visible.scrollIntoView({
        block: 'center',
      })
    }
  }

  connectedCallback() {
    const diary = this.getRootNode().host
    const entries = [...diary.querySelectorAll('x-entry')]
    const sections = [...diary.querySelectorAll('section[name]')]

    const pinned = entries.filter((entry) => entry.hasAttribute('pinned'))

    this.shadowRoot.querySelector('section#pinned ul').innerHTML = pinned
      .map(
        (entry) => html`
          <li>
            <svg viewBox="0 0 16 16">
              <path
                d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707-.195-.195.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146z"
              />
            </svg>
            <a href="#${entry.id}"> ${entry.getAttribute('name')} </a>
          </li>
        `
      )
      .join('')

    this.shadowRoot.querySelector('section#chapters').innerHTML = sections
      .map((section) => {
        const entries = section.querySelectorAll('x-entry')
        const weeks = [
          ...new Set([...entries].map((entry) => entry.getAttribute('week'))),
        ]
        return html` <details open>
          <summary>
            <span>${section.getAttribute('name')}</span>
          </summary>
          <div>
            ${weeks
              .map(
                (week) => html`
                  <nav>
                    ${[...entries]
                      .filter((entry) => entry.getAttribute('week') === week)
                      .map((entry) => {
                        const id = entry.getAttribute('id')
                        const pinned = entry.hasAttribute('pinned')
                        const name = entry.getAttribute('name')
                        return html`<a
                          href="#${id}"
                          class="${pinned ? 'pinned' : ''}"
                          >${name}</a
                        >`
                      })
                      .join('<span>·</span>')}
                  </nav>
                `
              )
              .join('')}
          </div>
        </details>`
      })
      .join('')

    const observer = new IntersectionObserver(this.highlightVisible.bind(this))
    entries.forEach((entry) => observer.observe(entry))
  }
}

customElements.define('x-diary-panel', DiaryPanel)

export { DiaryPanel }
