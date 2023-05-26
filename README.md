## Installation

### Simple Marquee

Simple Marquee is available as an [npm package](https://www.npmjs.com/package/@mollahdev/marquee).

**npm:**

```sh
npm i @mollahdev/marquee
```

## Import and use the package

```jsx
import Marquee from '@mollahdev/marquee'
/**
 * Marquee class
 * @param {1} string must be a html selector
 * @param {2} object configure the plugin output
 */ 
new Marquee( '.marquee-up', { 
    direction: 'up', // 'up' | 'down' | 'left' | 'right'
    duration: 30 // number
})

```

## HTML Markup
```jsx
<div class="marquee-down">
    <picture>
        <img src="./images/ecwid.webp" />
    </picture>
    <picture>
        <img src="./images/emoji.webp" />
    </picture>
    <picture>
        <img src="./images/shopify.webp" />
    </picture>
    <picture>
        <img src="./images/webflow.webp" />
    </picture>
    <picture>
        <img src="./images/wix.webp" />
    </picture>
    <picture>
        <img src="./images/wordpress.webp" />
    </picture>
</div>
`)
```
