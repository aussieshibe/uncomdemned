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
import $ from 'jquery';

let instance = null;

let basePath = window.location.pathname + 'gamedata/collider/';

/**
 * The ColliderLoader class
 * Handles all functionality for loading data from collider files into
 * rigidbodyMixin objects
 */
class _ColliderLoader {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }
  /**
  * The ColliderLoader load function
  * Loads data from a collider file into a rigidbodyMixin
  * @param {string} colliderFile The file in which the collider data resides
  *    (relative to /src/collider/)
  * @param {RigidbodyMixin} rigidbodyMixin the rigidbodyMixin we'll add data too
  */
  load(colliderFile, rigidbodyMixin) {
    return new Promise((resolve, reject) => {
      $.getJSON(basePath + colliderFile + '.json')
        .then((colliderData) => {
          var colliderArray = this._parseData(colliderData);
          for (var colliderData of colliderArray) {
            rigidbodyMixin.addShape(colliderData.shape, colliderData.offset);
          }
          resolve(rigidbodyMixin);
        });
    });
  }

  _parseData(colliderData) {
    var colliderArray = [];
    for (let shapeData of colliderData.shapes) {
      var collider = {};
      switch (shapeData.type) {
        case 'box':
          collider.shape = new CANNON.Box(
              new CANNON.Vec3(
                  shapeData.dimensions[0],
                  shapeData.dimensions[1],
                  shapeData.dimensions[2]
              )
          );
          collider.offset = new CANNON.Vec3(
              shapeData.offset[0],
              shapeData.offset[1],
              shapeData.offset[2]
          );
      }
      colliderArray.push(collider);
    }
    return colliderArray;
  }
}

let ColliderLoader = new _ColliderLoader();

export { ColliderLoader as default };
