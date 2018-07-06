## aframe-dialog-popup-component

[![Version](http://img.shields.io/npm/v/@editvr/aframe-dialog-popup-component.svg?style=flat-square)](https://npmjs.org/package/aframe-dialog-popup-component)
[![CircleCI](http://img.shields.io/circleci/project/github/EditVR/aframe-dialog-popup-component.svg?style=flat-square)](https://npmjs.org/package/@editvr/aframe-dialog-popup-component)
[![License](http://img.shields.io/npm/l/@editvr/aframe-dialog-popup-component.svg?style=flat-square)](https://npmjs.org/package/aframe-dialog-popup-component)

Provides a component that constructs a toggle-able dialog with a title, description, image, and 

For [A-Frame](https://aframe.io).

### API

| Property               | Description                 | Default Value                 |
| ---------------------- | --------------------------- | ----------------------------- |
| titleColor             | Text color of title.        | white                         |
| titleFont              | Title font.                 | mozillavr                     |

### Installation

#### Browser

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.8.2/aframe.min.js"></script>
  <script src="https://unpkg.com/@editvr/aframe-dialog-popup-component@1.0.3/dist/aframe-dialog-popup-component.min.js"></script>
</head>

<body>
  <a-scene>
    <a-entity dialog-popup="foo: bar"></a-entity>
  </a-scene>
</body>
```

#### npm

Install via npm:

```bash
npm install @editvr/aframe-dialog-popup-component
```

Then require and use.

```js
require('aframe');
require('@editvr/aframe-dialog-popup-component');
```
