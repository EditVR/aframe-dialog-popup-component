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
    active: {
      type: 'boolean',
      default: true,
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
    dialogBoxPadding: {
      type: 'number',
      default: 0.2
    }
  },
  multiple: true,
  dialogPlaneEl: null,
  closeIconEl: null,
  titleEl: null,
  bodyEl: null,
  imageEl: null,
  hasImage: false,
  /**
   * Spawns the entities required to support this dialog.
   */
  init() {
    this.cameraEl = document.querySelector('[camera]');
    this.generateOpenIcon()
    this.spawnEntities();
    this.el.emit('loaded');
  },
  /**
   * If the component is open, ensure it always faces the camera.
   */
  tick() {
    if (this.isOpen) {
      this.positionDialogPlane();
    }
  },
  /**
   * When this component is removed, destruct event listeners.
   */
  remove() {
    const { openOn } = this.data;
    this.el.removeEventListener(
      openOn,
      this.toggleDialogOpen.bind(this)
    );
    this.closeIconEl.removeEventListener(
      openOn,
      this.toggleDialogOpen.bind(this)
    );
  },
  /**
   * When this component is updated, re-calculate title, body, image, and
   * dialog plane to incorporate changes.
   */
  update() {
    this.generateTitle();
    this.generateBody();
    this.generateImage();
  },
  /**
   * Handles opening and closing the dialog plane.
   */
  toggleDialogOpen(event) {
    // If the close icon is clicked, close the dialog.
    if (event.target.getAttribute('id') === `${this.el.getAttribute('id')}--close-icon`) {
      this.dialogPlaneEl.setAttribute('visible', false);
      this.isOpen = false;
    }

    // If the open icon is clicked, and the dialog is active, open the dialog.
    if (this.data.active && event.target.getAttribute('id') === this.el.getAttribute('id')) {
      this.positionDialogPlane();
      this.dialogPlaneEl.setAttribute('visible', true);
      this.isOpen = true;
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

    this.el.setAttribute('geometry', {
      primitive: 'circle',
      radius
    });
    this.el.setAttribute('material', {
      color,
      src
    });

    this.el.addEventListener(openOn, this.toggleDialogOpen.bind(this));
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

    this.closeIconEl = closeIcon;
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
      dialogBoxPadding: padding,
      imageHeight
    } = this.data;

    const title = this.titleEl || document.createElement('a-entity');
    title.setAttribute('id', `${this.el.getAttribute('id')}--title`);
    title.setAttribute('text', {
      value: value.substring(0, wrapCount),
      color,
      font,
      wrapCount,
      width: width - padding * 2,
      baseline: 'top',
      anchor: 'left'
    });

    let y = height / 2 - padding;
    if (this.hasImage) {
      y -= imageHeight / 2;
    }

    title.setAttribute('position', {
      x: -(width / 2) + padding,
      y,
      z: 0.01
    });

    this.titleEl = title;
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
      dialogBoxPadding: padding,
      imageHeight
    } = this.data;

    const body = this.bodyEl || document.createElement('a-entity');
    body.setAttribute('id', `${this.el.getAttribute('id')}--title`);
    body.setAttribute('text', {
      value,
      color,
      font,
      wrapCount,
      width: width - padding * 2,
      baseline: 'top',
      anchor: 'left'
    });

    let y = height / 2 - padding * 3;
    if (this.hasImage) {
      y -= imageHeight / 2;
    }

    body.setAttribute('position', {
      x: -(width / 2) + padding,
      y,
      z: 0.01
    });

    this.bodyEl = body;
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

    const image = this.imageEl || document.createElement('a-image');
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
    this.imageEl = image;
    return image;
  },
  /**
   * Generates the dialog plane.
   */
  generateDialogPlane() {
    const {
      dialogBoxWidth: width,
      dialogBoxHeight: height,
      dialogBoxPadding: padding,
      dialogBoxColor: color
    } = this.data;

    const plane = this.dialogPlaneEl || document.createElement('a-entity');
    plane.setAttribute('id', `${this.el.getAttribute('id')}--dialog-plane`);
    plane.setAttribute('position', { x: 0, y: 0, z: 0.5 });
    plane.setAttribute('visible', false);
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

    this.dialogPlaneEl = plane;

    return plane;
  },
  positionDialogPlane() {
    if (this.dialogPlaneEl) {
      const vector = this.dialogPlaneEl.object3D.parent.worldToLocal(
        this.cameraEl.object3D.getWorldPosition()
      );
      this.dialogPlaneEl.object3D.lookAt(vector);
    }
  },
  spawnEntities() {
    this.el.appendChild(this.generateDialogPlane());
  }
});
