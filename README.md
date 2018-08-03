## aframe-dialog-popup-component

[![Version](http://img.shields.io/npm/v/@editvr/aframe-dialog-popup-component.svg?style=flat-square)](https://npmjs.org/package/aframe-dialog-popup-component)
[![CircleCI](http://img.shields.io/circleci/project/github/EditVR/aframe-dialog-popup-component.svg?style=flat-square)](https://npmjs.org/package/@editvr/aframe-dialog-popup-component)
[![License](http://img.shields.io/npm/l/@editvr/aframe-dialog-popup-component.svg?style=flat-square)](https://npmjs.org/package/aframe-dialog-popup-component)

Provides a component that constructs a toggle-able dialog with a title, description, image, and close button.

For [A-Frame](https://aframe.io).

### API

| Property               | Description                 | Default Value                 |
| ---------------------- | --------------------------- | ----------------------------- |
| title                  | String containing title.    | New Dialog                    |
| titleColor             | Text color of title.        | black                         |
| titleFont              | Title font.                 | mozillavr                     |
| titleWrapCount         | Title entity wrap count.    | 24                            |
| body                   | String containing body.     | This dialog has no body yet.  |
| bodyColor              | Text color of body.         | black                         |
| bodyFont               | Body  font.                 | mozillavr                     |
| bodyWrapCount          | Body entity wrap count.     | 30                            |
| openOn                 | Open/Close event.           | click                         |
| active                 | Turn dialog on/off.         | true                          |
| openIconImage          | Icon image for open button. | None                          |
| openIconRadius         | Radius for open icon.       | 0.3                           |
| openIconColor          | Color for open icon.        | white                         |
| closeIconImage         | Icon image for open button. | None                          |
| closeIconRadius        | Radius for close icon.      | 0.3                           |
| closeIconColor         | Color for close icon.       | white                         |
| image                  | Path to Dialog hero image.  | None                          |
| imageWidth             | Dialog hero image width.    | 2                             |
| imageHeight            | Dialog hero image height.   | 2                             |
| dialogBoxWidth         | Dialog box width.           | 4                             |
| dialogBoxHeight        | Dialog box height.          | 4                             |
| dialogBoxColor         | Dialog box background color.| white                         |
| dialogBoxPadding       | Dialog box padding.         | 0.2                           |

### Installation

#### Browser

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.8.2/aframe.min.js"></script>
  <script src="https://unpkg.com/@editvr/aframe-dialog-popup-component@1.7.2/dist/aframe-dialog-popup-component.min.js"></script>
</head>

<body>
  <a-scene>
    <a-entity dialog-popup="title: My Title; body: My Body"></a-entity>
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

## Example
### Closed
![Closed](https://github.com/EditVR/aframe-dialog-popup-component/raw/develop/examples/assets/closed.png)
### Opened
![Open](https://github.com/EditVR/aframe-dialog-popup-component/raw/develop/examples/assets/open.png)

