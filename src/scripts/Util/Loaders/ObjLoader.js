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
var loader = new THREE.JSONLoader();
var objPath = window.location.pathname + 'gamedata/mesh/';
console.log(objPath);

/**
 * The ObjLoader function
 * Returns a THREE.js geometry
 * NOTE: This currently just returns a basic geometry from the base.dimensions
 *
 * @param {Object} base The base options shared between modules
 * @param {Object} base.dimensions Object dimensions, used if no module.mesh
 * @param {Object} module The options specific to this module
 * @param {string} module.mesh The filename of the mesh to load
 */
function ObjLoader(base, module, callback) {
  var mesh;
  if (module && module.mesh) {
    console.log(objPath + module.mesh + '.json');
    loader.load(
      objPath + module.mesh + '.json');
  } else {
    // Setup a default from base.dimensions, otherwise 100x100x100 cube
    var dimensions = base.dimensions || {x: 100, y: 100, z: 100};
    mesh = new THREE.CubeGeometry(dimensions.x, dimensions.y, dimensions.z);
  }
  return mesh;
}

export { ObjLoader as default };
