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

import DrawableMixin from './DrawableMixin';
import ObjLoader from '../../Util/Loaders/ObjLoader';

/**
 * The DrawableMixinFactory class
 * DrawableMixinFactory create a DrawableMixin and load any necessary resources
 */
class DrawableMixinFactory {
  constructor() {}

  /**
   * The build function for DrawableMixinFactory
   * @param {Object} options The options for the new DrawableMixin
   * @param {number[]} options.position The position of the mixin within the obj
   * @param {string} options.objFile The object file to apply to the DM
   */
  build(options) {
    var drawableMixin = new DrawableMixin();
    ObjLoader.load(options.objFile, (g, m) => {
      drawableMixin.geometry = g;
      drawableMixin.material = new THREE.MultiMaterial(m);
    });
    return drawableMixin;
  }

}

export { DrawableMixinFactory as default };
