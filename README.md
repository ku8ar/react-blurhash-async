# react-blurhash-async

[![NPM Version](https://img.shields.io/npm/v/react-blurhash-async.svg?style=flat)](https://www.npmjs.com/package/react-blurhash-async)
[![NPM Downloads](https://img.shields.io/npm/dm/react-blurhash-async.svg?style=flat)](https://npmcharts.com/compare/react-blurhash-async?minimal=true)

### 🔥🔥 BLAZING FAST 🔥🔥 React components for using the [blurhash algorithm](https://blurha.sh) in your React projects.


> Fork of react-blurhash library running in WebWorker (not blocking JS thread).
> Check additional props: `loading` and `imageRef`.

[Demo](https://ku8ar.github.io/react-blurhash-async/)

## Motivation

This library was created to optimise the blurhash generation process in React projects. It is mainly intended for projects where blurHash is just placeholder for images. By using react-blurhash-async, the cost of generating an SPA page with HUNDRED such placeholders is insignificant.

The library was written on 12 June 2022 A.D, inspired by Robert Kubica's drive in the Le Mans race.

## How It Works

Page generation time is crucial. When the `react-blurhash-async` component is with the `loading=lazy` flag, the generation of the **CPU-expensive blurhash** is done in the `WebWorker` (when the browser has `OffScreen Canvas` support), or delayed by one tick (when the browser does not have OffScreen Canvas support) so as not to delay the rendering of the new page in SPA.
This allows to generate a page with even a hundred blurhashes, *without significant performance degradation*.

![Alt text](./work.png?raw=true "Example")

In addition, because blurhash is a placeholder for image, a new property `imageRef` has been added that can conditionally **force the component to stop generating blurhash when an image is already loaded**.
Using this property is more efficient than writing a conditional component that does the same thing (unmounting <canvas /> from the DOM tree is moderately efficient when rendering several hundred components).

#### Suggested example of use with imageRef optimization

```js
const ImageWithBlurhash = ({ src, hash, loading }) => {
    const ref = useRef()
    return (
      <div style={relativeStyle}>
        <BlurHash imageRef={ref} hash={hash} loading={loading} style={absoluteStyleToFitParent} />
        <img ref={ref} src={src} loading={loading} style={absoluteStyleToFitParent} />
      </div> 
    )
}
```

## Install

```sh
yarn add blurhash react-blurhash-async
```

## Usage

### `<Blurhash />`

```js
import { Blurhash } from "react-blurhash-async"
```

### Description

`Blurhash` component is the recommended way to render blurhashes in your React projects.
It uses `BlurhashCanvas` and a wrapping `div` to scale the decoded image to your desired size. You may control the quality of the decoded image with `resolutionX` and `resolutionY` props.

#### Props

| name                     | description                                                                                                                                                                  |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hash` (string)          | The encoded blurhash string.                                                                                                                                                 |
| `width` (int \| string)  | Width (CSS) of the decoded image.                                                                                                                                            |
| `height` (int \| string) | Height (CSS) of the decoded image.                                                                                                                                           |
| `resolutionX` (int)      | The X-axis resolution in which the decoded image will be rendered at. Recommended min. 32px. Large sizes (>128px) will greatly decrease rendering performance. (Default: 32) |
| `resolutionY` (int)      | The Y-axis resolution in which the decoded image will be rendered at. Recommended min. 32px. Large sizes (>128px) will greatly decrease rendering performance. (Default: 32) |
| `punch` (int)            | Controls the "punch" value (~contrast) of the blurhash decoding algorithm. (Default: 1)                                                                                      |
| `loading` ('eager' \| 'lazy')            | Controls how blurhash is rendered. "eager" -> blocks the thread, and component will be rendered together with blurhash. "lazy" -> loads blurhash after render cycle. When browser supports Canvas OffScreen, blurhash is generated inside webworker. (Default: "lazy")                                                                                      |
| `imageRef` (MutableRefObject<HTMLImageElement)            | Additional optimisation parameter. Most blurHashes are placeholders generated for images. Giving to component a reference to `<img />` allows it to optionally not generate blurhash when image is visible (cached in browser memory).. (Default: undefined)                                                                                      |

#### Example

```jsx
<Blurhash hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj" width={400} height={300} resolutionX={32} resolutionY={32} punch={1} />
```

### `<BlurhashCanvas />`

```js
import { BlurhashCanvas } from "react-blurhash-async"
```

### Description

`BlurhashCanvas` is the barebones implementation of a blurhash string to a canvas. You may want to use it instead of the `Blurhash` component e.g. if you want to control the scaling yourself.

#### Props

| name            | description                                                                             |
| --------------- | --------------------------------------------------------------------------------------- |
| `hash` (string) | The encoded blurhash string.                                                            |
| `width` (int)   | Width of the decoded image.                                                             |
| `height` (int)  | Height of the decoded image.                                                            |
| `punch` (int)   | Controls the "punch" value (~contrast) of the blurhash decoding algorithm. (Default: 1) |
| `loading` ('eager' \| 'lazy')            | Controls how blurhash is rendered. "eager" -> blocks the thread, and component will be rendered together with blurhash. "lazy" -> loads blurhash after render cycle. When browser supports Canvas OffScreen, blurhash is generated inside webworker. (Default: "lazy")                                                                                      |
| `imageRef` (MutableRefObject<HTMLImageElement)            | Additional optimisation parameter. Most blurHashes are placeholders generated for images. Giving to component a reference to `<img />` allows it to optionally not generate blurhash when image is visible (cached in browser memory).. (Default: undefined)                                                                                      |

#### Example

```jsx
<BlurhashCanvas hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj" width={400} height={300} punch={1} />
```

## Browser support

- Blurhash depends on `Uint8ClampedArray`, which is supported on all mainstream browsers and >=IE11.
- **Optional** OffScreenCanvas : https://caniuse.com/offscreencanvas
- **Optional** Web Worker: https://caniuse.com/webworkers

## Credits (real authors of this library)
- [Wolt BlurHash (beautiful algorithm)](https://blurha.sh/)
- [Paul Senon (idea of using OffScreenCanvas and Web Worker to generate blurHash)](https://stackblitz.com/edit/poc-blurhash-webworker?file=README.md)
- [@mad-gooze (author of fast-blurhash)](https://github.com/mad-gooze/fast-blurhash)
- [@piotr-oles (only person on GH who was able to explain how to use webpack with Webworker on CDN)](https://github.com/webpack/webpack/discussions/14648#discussioncomment-1589272)
