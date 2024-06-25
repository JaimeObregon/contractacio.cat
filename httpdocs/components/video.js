import { MyElement, html, css } from '../modules/element.js'

class Video extends MyElement {
  static styles = css`
    :host {
      display: block;
    }

    figure {
      margin: 0;
    }

    figure video {
      display: block;
      margin: 0 auto;
      max-width: 100%;
      block-size: 100%;
    }
  `

  // Para Safari es necesario utilizar `preload="none"` y, en consecuencia,
  // definir un `poster`. De lo contrario Safari redimensiona visiblemente el
  // elemento `<video>` cuando el vídeo ha precargado, lo que provoca el
  // desplazamiento de todo el _layout_ subsiguiente cuando la precarga finaliza.
  // Si había un fragmento en la URL (#), para entonces el _scroll_ de la página
  // ya estaba en el lugar correcto, pero el redimensionado del vídeo provoca
  // el desplazamiento del _layout_ y el _scroll_ existente pasa a ser inexacto.
  // Lo evitamos con este elementoo `<x-video>` que obliga al `preload` y a un.
  // `poster`.
  static html = html`
    <figure>
      <video controls preload="none"></video>
      <slot></slot>
    </figure>
  `

  connectedCallback() {
    const video = this.shadowRoot.querySelector('video')

    const src = this.getAttribute('src')
    const width = this.getAttribute('width')
    const height = this.getAttribute('height')

    const poster = src.replace(/\.mp4$/, '.webp')

    video.setAttribute('height', height)
    video.setAttribute('width', width)
    video.setAttribute('poster', poster)
    video.setAttribute('src', src)
  }
}

customElements.define('x-video', Video)

export { Video }
