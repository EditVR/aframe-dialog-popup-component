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
    body: {
      type: 'string',
      default: 'This dialog has no body yet.'
    },
    image: {
      type: 'string',
      default: ''
    },
    openOn: {
      type: 'string',
      default: 'click'
    },
    defaultOpen: {
      type: 'bool',
      default: true
    },
    openIconImage: {
      type: 'asset',
      default: './assets/info.jpg'
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
      default: './assets/close.jpg'
    },
    closeIconRadius: {
      type: 'number',
      default: 0.3
    },
    closeIconColor: {
      type: 'string',
      default: 'white'
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
    const openIcon = document.createElement('a-entity');
    openIcon.setAttribute('id', `${this.el.getAttribute('id')}--open-icon`);
    openIcon.setAttribute('position', this.el.getAttribute('position'));
    openIcon.setAttribute('geometry', {
      primitive: 'circle',
      radius: this.data.openIconRadius
    });
    openIcon.setAttribute('material', {
      color: this.data.openIconColor,
      src: this.data.openIconImage
    });

    openIcon.addEventListener(
      this.data.openOn,
      this.toggleDialogOpen.bind(this)
    );
    return openIcon;
  },
  /**
   * Generates the close icon.
   */
  generateCloseIcon() {
    const closeIcon = document.createElement('a-entity');
    closeIcon.setAttribute('id', `${this.el.getAttribute('id')}--close-icon`);
    closeIcon.setAttribute('position', {
      x: this.data.dialogBoxWidth / 2,
      y: this.data.dialogBoxHeight / 2,
      z: 0.01
    });
    closeIcon.setAttribute('geometry', {
      primitive: 'circle',
      radius: this.data.closeIconRadius
    });
    closeIcon.setAttribute('material', {
      color: this.data.closeIconColor,
      src: this.data.closeIconImage
    });

    closeIcon.addEventListener(
      this.data.openOn,
      this.toggleDialogOpen.bind(this)
    );
    return closeIcon;
  },
  /**
   * Generates the title text.
   */
  generateTitle() {
    const title = document.createElement('a-text');
    title.setAttribute('id', `${this.el.getAttribute('id')}--title`);
    title.setAttribute('value', this.data.title);
    title.setAttribute('color', this.data.titleColor);
    title.setAttribute('position', {
      x: -(this.data.dialogBoxWidth / 2) + this.data.dialogBoxPaddingInDegrees,
      y: this.data.dialogBoxHeight / 2 - this.data.dialogBoxPaddingInDegrees,
      z: 0.01
    });

    return title;
  },
  /**
   * Generates the dialog plane.
   */
  generateDialogPlane() {
    const plane = document.createElement('a-entity');

    // The dialog should always be a little closer to the camera than the icon.
    const position = Object.assign({}, this.el.getAttribute('position'));
    position.z += 1;

    plane.setAttribute('visible', this.data.defaultOpen);
    plane.setAttribute('position', position);
    plane.setAttribute('geometry', {
      primitive: 'plane',
      width: this.data.dialogBoxWidth,
      height: this.data.dialogBoxHeight
    });

    plane.setAttribute('material', {
      color: this.data.dialogBoxColor
    });

    plane.appendChild(this.generateCloseIcon());
    plane.appendChild(this.generateTitle());
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
