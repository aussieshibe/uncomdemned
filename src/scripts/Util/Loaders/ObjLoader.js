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

// THREE.JSONLoader to be used by our ObjLoader
let loader = new THREE.JSONLoader();
let objPath = window.location.pathname + 'gamedata/mesh/';

// Singleton instance
let instance = null;

/**
 * The ObjLoader class
 */
class _ObjLoader {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  load (objFile, callback) {
    if (objFile) {
      loader.load(
          objPath + objFile + '.json',
          (g, m) => { callback(g, m); });
    } else {
      throw new Error('Invalid parameters provided to ObjLoader');
    }
  }
}

let ObjLoader = new _ObjLoader();

export { ObjLoader as default };
