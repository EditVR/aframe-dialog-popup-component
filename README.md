## aframe-dialog-popup-component

[![Version](http://img.shields.io/npm/v/aframe-dialog-popup-component.svg?style=flat-square)](https://npmjs.org/package/aframe-dialog-popup-component)
[![License](http://img.shields.io/npm/l/aframe-dialog-popup-component.svg?style=flat-square)](https://npmjs.org/package/aframe-dialog-popup-component)

Provides a component that constructs a toggle-able dialog with a title, description, image, and 

For [A-Frame](https://aframe.io).

### API

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
|          |             |               |

### Installation

#### Browser

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.8.2/aframe.min.js"></script>
  <script src="https://unpkg.com/aframe-dialog-popup-component/dist/aframe-dialog-popup-component.min.js"></script>
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
npm install aframe-dialog-popup-component
```

Then require and use.

```js
require('aframe');
require('aframe-dialog-popup-component');
```
