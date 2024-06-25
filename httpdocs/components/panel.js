import { MyElement, html, css } from '../modules/element.js'

class Panel extends MyElement {
  breakpoint = 1280

  storageKey = 'panel'

  static styles = css`
    :host([panel='visible'].float):before {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(5px);
      z-index: 1;
      cursor: pointer;
    }

    nav {
      --panel-width: calc(22rem + 6vw);
      --panel-padding: var(--space-large);
      display: flex;
      position: relative;
      width: var(--panel-width);
      max-width: calc(100vw - var(--switch-size) - var(--space-large));
      height: 100vh;
      flex-shrink: 0;
      border-right: 1px solid var(--color-line);
      box-sizing: border-box;
      background: var(--color-diary-nav);
      transition: var(--delay-medium) var(--ease-out-5);
    }

    :host([panel='hidden']) nav {
      margin-left: calc(-1 * var(--panel-width));
    }

    :host(.float) nav {
      position: absolute;
      z-index: 1;
    }

    nav slot {
      display: block;
      width: 100%;
      overflow-y: scroll;
    }

    nav button {
      position: absolute;
      padding: 0;
      width: var(--switch-size);
      aspect-ratio: 1;
      top: var(--space-medium);
      right: calc(-1 * (var(--switch-size) + 1px + var(--space-medium)));
      font-size: var(--type-medium);
      outline-offset: 5px;
      border: none;
      background: none;
      cursor: pointer;
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
    }

    nav button svg {
      fill: var(--color-text-pale);
      transition: var(--delay-medium) var(--ease-out-5);
      transform: rotate(90deg);
    }

    nav button:hover svg {
      fill: var(--color-highlight);
    }

    :host([panel='hidden']) nav button svg {
      transform: rotate(0deg);
    }

    @media (max-width: 768px) {
      nav {
        --panel-padding: var(--space-medium);
      }
    }

    @media print {
      :host {
        display: none;
      }
    }
  `

  static html = html`
    <nav>
      <slot></slot>
      <button>
        <svg viewBox="0 0 16 16">
          <path
            d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
          ></path>
        </svg>
      </button>
    </nav>
  `

  get panel() {
    return this.open ? 'visible' : 'hidden'
  }

  set panel(value) {
    document.querySelector('html').dataset.panel = this.panel
    this.classList.toggle('float', window.innerWidth < this.breakpoint)
    this.setAttribute('panel', value)
    this.open = value === 'visible'
  }

  clickHandler(event) {
    if (event.target !== this) {
      return
    }
    this.panel = this.panel === 'visible' ? 'hidden' : 'visible'
    localStorage.setItem(this.storageKey, this.panel)

    const audio = this.sounds[this.panel]
    audio.play()
  }

  connectedCallback() {
    this.button = this.shadowRoot.querySelector('button')

    this.sounds = {
      visible: new Audio('/sounds/activate.mp3'),
      hidden: new Audio('/sounds/deactivate.mp3'),
    }

    const stored = localStorage.getItem(this.storageKey)
    this.panel = stored ?? 'visible'

    this.addEventListener('click', this.clickHandler.bind(this))

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.panel = 'hidden'
        localStorage.setItem(this.storageKey, this.panel)
      }
    })

    this.resizeHandler = () => {
      const width = window.innerWidth
      const stored = localStorage.getItem(this.storageKey)
      const computed = width < this.breakpoint ? 'hidden' : 'visible'
      this.panel = stored ?? computed
    }

    window.addEventListener('resize', this.resizeHandler)

    this.resizeHandler()
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.resizeHandler)
  }
}

customElements.define('x-panel', Panel)

export { Panel }
