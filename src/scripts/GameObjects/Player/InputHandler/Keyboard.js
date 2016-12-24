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
 * Keyboard class handles the keyboard state for the InputHandler
 */
class Keyboard {
  /**
   * Constructor for the Keyboard class
   */
  constructor() {
    // Store state
    this.keys = {};

    // Setup listeners for key events
    document.addEventListener('keydown', (e) => this._onKeyDown(e), false);
    document.addEventListener('keyup', (e) => this._onKeyUp(e), false);
  }

  /**
   * Callback listener for keydown event
   */
  _onKeyDown(e) {
    this.keys[e.key.toLowerCase()] = true;
    e.preventDefault();
    e.stopPropagation();
  }

  /**
   * Callback listener for keyup event
   */
  _onKeyUp(e) {
    this.keys[e.key.toLowerCase()] = false;
  }

  /**
   * Check if a key is down,
   * @param {string} key The key to check
   */
  keyIsPressed(key) {
    if (this.keys[key.toLowerCase()]) {
      return true;
    } else {
      return false;
    }
  }
}

export { Keyboard as default };
