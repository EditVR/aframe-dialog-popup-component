/**
 * @file index.js
 * Contains code that registers a dialog popup component.
 */

/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error(
    'Component attempted to register before AFRAME was available.'
  );
}

/**
 * Dialog Popup component for A-Frame.
 */
AFRAME.registerComponent('dialog-popup', {
  schema: {
    title: {
      type: 'string',
      default: 'New Dialog'
    },
    titleColor: {
      type: 'string',
      default: 'black'
    },
    titleFont: {
      type: 'string',
      default: 'mozillavr'
    },
    titleWrapCount: {
      type: 'number',
      default: 24
    },
    body: {
      type: 'string',
      default: 'This dialog has no body yet.'
    },
    bodyColor: {
      type: 'string',
      default: 'black'
    },
    bodyFont: {
      type: 'string',
      default: 'mozillavr'
    },
    bodyWrapCount: {
      type: 'number',
      default: 30
    },
    openOn: {
      type: 'string',
      default: 'click'
    },
    defaultOpen: {
      type: 'bool',
      default: false
    },
    openIconImage: {
      type: 'asset',
      default: ''
    },
    openIconRadius: {
      type: 'number',
      default: 0.3
    },
    openIconColor: {
      type: 'string',
      default: 'white'
    },
    closeIconImage: {
      type: 'asset',
      default: ''
    },
    closeIconRadius: {
      type: 'number',
      default: 0.3
    },
    closeIconColor: {
      type: 'string',
      default: 'white'
    },
    image: {
      type: 'string',
      default: ''
    },
    imageWidth: {
      type: 'number',
      default: 2
    },
    imageHeight: {
      type: 'number',
      default: 2
    },
    dialogBoxWidth: {
      type: 'number',
      default: 4
    },
    dialogBoxHeight: {
      type: 'number',
      default: 4
    },
    dialogBoxColor: {
      type: 'string',
      default: 'white'
    },
    dialogBoxPaddingInDegrees: {
      type: 'number',
      default: 0.2
    }
  },
  multiple: true,
  dialogPlane: null,
  hasImage: false,
  /**
   * Spawns the entities required to support this dialog.
   */
  init() {
    this.spawnEntities();
  },
  /**
   * Handles opening and closing the dialog plane.
   */
  toggleDialogOpen() {
    this.isOpen = !this.isOpen;
    if (this.dialogPlane) {
      this.dialogPlane.setAttribute('visible', this.isOpen);
    }
  },
  /**
   * Generates the open icon.
   */
  generateOpenIcon() {
    const {
      openIconRadius: radius,
      openIconColor: color,
      openIconImage: src,
      openOn
    } = this.data;

    const openIcon = document.createElement('a-entity');
    openIcon.setAttribute('id', `${this.el.getAttribute('id')}--open-icon`);
    openIcon.setAttribute('position', this.el.getAttribute('position'));
    openIcon.setAttribute('geometry', {
      primitive: 'circle',
      radius
    });
    openIcon.setAttribute('material', {
      color,
      src
    });

    openIcon.addEventListener(openOn, this.toggleDialogOpen.bind(this));
    return openIcon;
  },
  /**
   * Generates the close icon.
   */
  generateCloseIcon() {
    const {
      closeIconRadius: radius,
      closeIconColor: color,
      closeIconImage: src,
      dialogBoxWidth: width,
      dialogBoxHeight: height,
      openOn
    } = this.data;

    const closeIcon = document.createElement('a-entity');
    closeIcon.setAttribute('id', `${this.el.getAttribute('id')}--close-icon`);
    closeIcon.setAttribute('position', {
      x: width / 2,
      y: height / 2,
      z: 0.01
    });
    closeIcon.setAttribute('geometry', {
      primitive: 'circle',
      radius
    });
    closeIcon.setAttribute('material', {
      color,
      src
    });

    closeIcon.addEventListener(openOn, this.toggleDialogOpen.bind(this));
    return closeIcon;
  },
  /**
   * Generates the title text.
   */
  generateTitle() {
    const {
      title: value,
      titleColor: color,
      titleFont: font,
      titleWrapCount: wrapCount,
      dialogBoxWidth: width,
      dialogBoxHeight: height,
      dialogBoxPaddingInDegrees: padding,
      imageHeight
    } = this.data;

    const title = document.createElement('a-entity');
    title.setAttribute('id', `${this.el.getAttribute('id')}--title`);
    title.setAttribute('text', {
      value: value.substring(0, wrapCount),
      color,
      font,
      width,
      wrapCount,
      baseline: 'top'
    });

    let y = height / 2 - padding;
    if (this.hasImage) {
      y -= imageHeight / 2;
    }

    title.setAttribute('position', {
      x: padding,
      y,
      z: 0.01
    });

    return title;
  },
  /**
   * Generates the body text entity.
   */
  generateBody() {
    const {
      body: value,
      bodyColor: color,
      bodyFont: font,
      bodyWrapCount: wrapCount,
      dialogBoxWidth: width,
      dialogBoxHeight: height,
      dialogBoxPaddingInDegrees: padding,
      imageHeight
    } = this.data;

    const body = document.createElement('a-entity');
    body.setAttribute('id', `${this.el.getAttribute('id')}--title`);
    body.setAttribute('text', {
      value,
      color,
      width,
      font,
      wrapCount,
      baseline: 'top'
    });

    let y = height / 2 - padding * 3;
    if (this.hasImage) {
      y -= imageHeight / 2;
    }

    body.setAttribute('position', {
      x: padding,
      y,
      z: 0.01
    });

    return body;
  },
  /**
   * Generates the image entity.
   */
  generateImage() {
    const {
      image: src,
      imageWidth: width,
      imageHeight: height,
      dialogBoxHeight
    } = this.data;

    if (!src.length) {
      return null;
    }

    const image = document.createElement('a-image');
    image.setAttribute('id', `${this.el.getAttribute('id')}--image`);
    image.setAttribute('src', src);
    image.setAttribute('width', width);
    image.setAttribute('height', height);
    image.setAttribute('position', {
      x: 0,
      y: dialogBoxHeight / 2,
      z: 0.01
    });

    this.hasImage = true;
    return image;
  },
  /**
   * Generates the dialog plane.
   */
  generateDialogPlane() {
    const {
      dialogBoxWidth: width,
      dialogBoxHeight: height,
      dialogBoxPaddingInDegrees: padding,
      dialogBoxColor: color
    } = this.data;

    const plane = document.createElement('a-entity');

    // The dialog should always be a little closer to the camera than the icon.
    const position = Object.assign({}, this.el.getAttribute('position'));
    position.z += 1;

    plane.setAttribute('visible', this.data.defaultOpen);
    plane.setAttribute('position', position);
    plane.setAttribute('geometry', {
      primitive: 'plane',
      width: width + padding,
      height: height + padding
    });

    const image = this.generateImage();
    if (image) {
      plane.appendChild(this.generateImage());
    }

    plane.setAttribute('material', { color });
    plane.appendChild(this.generateCloseIcon());
    plane.appendChild(this.generateTitle());
    plane.appendChild(this.generateBody());

    this.dialogPlane = plane;
    return plane;
  },
  spawnEntities() {
    const wrapper = document.createElement('a-entity');
    wrapper.setAttribute('id', `${this.el.getAttribute('id')}--wrapper`);
    wrapper.appendChild(this.generateOpenIcon());
    wrapper.appendChild(this.generateDialogPlane());
    this.el.sceneEl.appendChild(wrapper);
  }
});
