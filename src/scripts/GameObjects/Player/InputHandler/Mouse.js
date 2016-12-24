/**
 * @license
 * Copyright (c) 2016 Nicholas Nelson
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * Handles Mouse related input for the InputHandler
 */
class Mouse {
  constructor() {
    this._setupEventListeners();
    this._movementSum = new THREE.Vector2(0,0); // Sum of movement since checked
  }

  /**
   * Returns a Vector containing the net mouse movement
   * since the last time this function was called
   */
  getMovement() {
    var movement = this._movementSum.clone();
    this._movementSum.set(0, 0, 0);
    return movement;
  }

  /**
   * The pointerlockchange event handler
   */
  _onPointerLockChange(e) {
    if (document.pointerLockElement === document.body ||
        document.mozPointerLockElement === document.body ||
        document.webkitPointerLockElement === document.body) {
      // Pointer was locked, add mousemove listener
      document.body
          .addEventListener(
              'mousemove',
              document.mouseMoveListener = (e) => this._onMouseMove(e),
              false);
    } else {
      // Pointer was unlocked, remove the mousemove listener
      document.body
          .removeEventListener('mousemove', document.mouseMoveListener);
    }
  }

  /**
   * The mousemove event handler
   */
  _onMouseMove(e) {
    this._movementSum.x +=
        e.movementX ||
        e.mozMovementX ||
        e.webkitMovementX ||
        0;
    this._movementSum.y +=
        e.movementY ||
        e.mozMovementY ||
        e.webkitMovementY ||
        0;
  }

  /**
   * Sets up event listeners for the body element
   */
  _setupEventListeners() {
    document.addEventListener(
        'pointerlockchange',
        (e) => this._onPointerLockChange(e),
        false);
    document.addEventListener(
        'mozpointerlockchange',
        (e) => this._onPointerLockChange(e),
        false);
    document.addEventListener(
        'webkitpointerlockchange',
        (e) => this._onPointerLockChange(e),
        false);

    document.body.requestPointerLock =
      document.body.requestPointerLock ||
      document.body.mozRequestPointerLock ||
      document.body.webkitRequestPointerLock;
    document.body.addEventListener(
          'click',
          () => document.body.requestPointerLock(),
          false);
  }
}

export { Mouse as default };
