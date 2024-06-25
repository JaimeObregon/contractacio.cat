import { MyElement } from './element.js'

class Layout extends MyElement {
  constructor() {
    super()
  }

  readyHandler() {
    const { hash } = document.location
    if (hash) {
      const selector = decodeURIComponent(hash)
      const element = document.querySelector(selector)
      if (element) {
        element.scrollIntoView({
          block: 'start',
        })
      }

      // TODO: En Chrome: cuando se recarga la página se pierde el hash
      document.location.hash = hash
    } else {
      // TODO: Funciona en x-diary pero no en x-post
      const slot = this.shadowRoot.querySelector('slot')
      slot.scrollTop = 0
    }
  }

  async connectedCallback() {
    window.addEventListener('popstate', this.readyHandler.bind(this))

    // Layout calculations are dependent on the rendered font, and loading the
    // fonts may take longer than rendering the layout for the first time.
    await document.fonts.ready

    this.readyHandler()
  }

  disconnectedCallback() {
    window.removeEventListener('popstate', this.readyHandler.bind(this))
  }
}

export { Layout }
