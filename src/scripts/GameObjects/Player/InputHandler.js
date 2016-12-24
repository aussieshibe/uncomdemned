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

import Keyboard from './InputHandler/Keyboard';
import Mouse from './InputHandler/Mouse';

/**
 * The InputHandler class handles all player input and
 * adjusts the player object accordingly
 */
class InputHandler {
  constructor() {
    this._keyboard = new Keyboard();
    this._mouse = new Mouse();
    this.mouseSensitivity = 0.001;
  }

  /**
   * getMovement calculates any required movement based on keyboard input
   */
  getMovement() {
    var movement = new THREE.Vector3(0,0,0);
    if (this._keyboard.keyIsPressed('w')) {
      movement.z = -1;
    }
    if (this._keyboard.keyIsPressed('s')) {
      movement.z = 1;
    }
    if (this._keyboard.keyIsPressed('a')) {
      movement.x = -1;
    }
    if (this._keyboard.keyIsPressed('d')) {
      movement.x = 1;
    }
    if (this._keyboard.keyIsPressed(' ')) {
      movement.y = 1;
    }
    if (this._keyboard.keyIsPressed('c')) {
      movement.y = -1;
    }
    return movement;
  }

  getRotation() {
    return this._mouse.getMovement().multiplyScalar(this.mouseSensitivity);
  }
}

export { InputHandler as default };
