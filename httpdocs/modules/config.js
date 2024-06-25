import { css } from './element.js'

const chapters = ['diary/propuestas']

const item = {
  id: '',
  url: 'https://contractes.netlify.app/',
  title: 'Propuestas a los portales de contratación',
  content_text:
    'Propuestas de mejora a la ergonomía de los portales de transparencia de la contratación pública en Cataluña.',
  tags: [],
  language: 'es',
  _jaime: {
    element: 'x-diary',
    license: 'CC BY-SA',
  },
}

const styles = css`
  ::selection {
    background-color: var(--color-highlight);
    color: var(--color-highlight-inverted);
  }

  strong {
    font-weight: bold;
    color: var(--color-highlight);
  }

  a {
    color: var(--color-link);
    text-decoration: 0.075em underline;
    text-underline-offset: var(--space-x-small);
  }

  a:hover {
    text-decoration: 0.075em underline double;
  }

  a[href^='http'] {
    text-decoration: inherit;
    color: inherit;
  }

  a[href^='http']::after {
    content: '°';
    position: relative;
    top: -0.2em;
    color: var(--color-accent);
  }

  a[href^='http']:hover {
    text-decoration: none;
    background: var(--color-highlight-inverted);
  }

  a strong {
    color: inherit;
  }

  span.roman {
    font-variant-caps: all-small-caps;
  }

  abbr {
    font-variant-caps: all-small-caps;
    font-variant-numeric: oldstyle-nums;
  }

  abbr[title],
  span[title] {
    cursor: help;
  }

  ins {
    text-decoration: none;
    color: var(--color-highlight);
  }

  del {
    text-decoration: underline;
    text-underline-offset: -30%;
    text-decoration-skip-ink: none;
    color: var(--color-text-pale);
  }

  del strong {
    color: inherit;
  }

  del a {
    text-decoration: none !important;
  }

  i,
  em {
    font-style: italic;
  }

  cite {
    font-style: inherit;
    font-variant: small-caps;
  }

  dfn {
    font-style: normal;
    text-decoration: underline dashed;
    text-underline-offset: var(--space-x-small);
  }

  x-term,
  span.dfn {
    font-size: var(--type-x-small);
  }

  span.dfn {
    text-transform: uppercase;
    vertical-align: super;
  }

  span.dfn::before {
    content: '[';
  }

  span.dfn::after {
    content: ']';
  }

  hr {
    margin-top: var(--space-xx-large);
    border: none;
    overflow: visible;
  }

  figure {
    text-align: center;
  }

  figcaption {
    margin: var(--space-small) auto;
    font-size: var(--type-x-small);
    text-align: center;
  }

  h1 {
    font-style: italic;
    letter-spacing: 0;
  }

  h2 {
    font-size: var(--type-large);
    margin: var(--space-large) 0 0 0;
    line-height: var(--line-height-condensed);
    color: var(--color-heading);
    letter-spacing: 0;
  }

  blockquote footer {
    text-align: right;
  }

  blockquote footer b {
    font-weight: inherit;
    font-style: normal;
    font-variant: small-caps;
  }

  ol,
  ul {
    list-style: none;
    padding: 0;
  }

  :is(ol, ul) li {
    position: relative;
    padding-left: var(--bleed);
  }

  ol {
    counter-reset: number;
  }

  ol[start='0'] {
    counter-reset: number -1;
  }

  ol li::before {
    position: absolute;
    content: counter(number);
    top: -0.125em;
    left: 0;
    font-size: var(--type-large);
    font-family: 'Numbered';
    letter-spacing: 0;
    counter-increment: number;
    counter-start: 3;
    font-style: normal;
  }

  ul li::before {
    position: absolute;
    content: '–';
    top: -0.15em;
    left: 0;
    font-size: var(--type-large);
  }

  code {
    background: var(--color-highlight-inverted);
  }

  x-details div[slot='summary'] {
    font-style: italic;
    color: var(--color-link);
  }

  x-details div[slot='summary'] :is(i, em) {
    font-style: normal;
  }
`

export { item, chapters, styles }
