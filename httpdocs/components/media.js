import { MyElement, html, css } from '../modules/element.js'

class Media extends MyElement {
  static styles = css`
    :host {
      display: block;
    }

    figure {
      margin: 0;
      max-height: inherit;
    }

    figure div {
      display: flex;
      justify-content: center;
      max-height: inherit;
      overflow-x: auto;
    }

    figure div nav {
      display: inline-flex;
      gap: var(--space-small);
    }

    figure div nav ::slotted(img) {
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 18em;
      object-fit: contain;
      cursor: zoom-in;
    }

    figure div nav.with_1 ::slotted(img) {
      max-height: 32em;
    }

    figure div nav.with_2 ::slotted(img) {
      max-height: 21em;
    }
  `

  static html = html`
    <figure>
      <div>
        <nav>
          <slot></slot>
        </nav>
      </div>
      <slot name="caption"></slot>
    </figure>
  `

  open() {
    const { top, left, width, height } = this.getBoundingClientRect()

    const clone = this.cloneNode()
    clone.style.top = `${top}px`
    clone.style.left = `${left}px`
    clone.style.width = `${width}px`
    clone.style.height = `${height}px`
    clone.style.opacity = 0

    const dialog = document.createElement('dialog')
    dialog.setAttribute('open', true)
    dialog.append(clone)

    dialog.keydownHandler = (event) => {
      const actions = {
        Escape: dialog.close,
        ArrowLeft: () => {
          if (this === this.prev) {
            return
          }
          dialog.close()
          this.parentNode.open.bind(this.prev)()
        },
        ArrowRight: () => {
          if (this === this.next) {
            return
          }
          dialog.close()
          this.parentNode.open.bind(this.next)()
        },
      }

      if (actions[event.key]) {
        actions[event.key]()
        event.stopPropagation()
        event.preventDefault()
      }
    }

    dialog.close = () => {
      document.removeEventListener('keydown', dialog.keydownHandler, true)
      dialog.classList.remove('open')

      setTimeout(() => dialog.remove(), 350)
    }

    document.body.append(dialog)

    setTimeout(() => dialog.classList.add('open'), 0)

    dialog.addEventListener('click', dialog.close)
    document.addEventListener('keydown', dialog.keydownHandler, true)
  }

  connectedCallback() {
    const images = [...this.querySelectorAll('img')]

    const nav = this.shadowRoot.querySelector('nav')
    const className = `with_${images.length}`
    nav.classList.add(className)

    images.forEach((image, index) => {
      image.prev = images.at(Math.max(0, index - 1))
      image.next = images.at(Math.min(images.length - 1, index + 1))
      image.addEventListener('click', this.open)
    })
  }
}

customElements.define('x-media', Media)

export { Media }
