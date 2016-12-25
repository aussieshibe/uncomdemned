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

import ObjLoader from '../../Util/Loaders/ObjLoader';

/**
 * The RigidbodyMixin class
 * Defines a mixin to add a physics object to a GameObject
 * @param {Object} options The options to be passed to the mixin
 */
class RigidbodyMixin extends CANNON.Body {
  constructor(options) {
    super({mass: 1});
    this.position.set(0, 0, 0);
    this.addShape(new CANNON.Box(new CANNON.Vec3(50, 50, 50)));
  }

  update(parent, delta) {
    parent.position.x = this.position.x;
    parent.position.y = this.position.y;
    parent.position.z = this.position.z;
    parent.quaternion.x = this.quaternion.x;
    parent.quaternion.y = this.quaternion.y;
    parent.quaternion.z = this.quaternion.z;
    parent.quaternion.w = this.quaternion.w;
  }
}

export { RigidbodyMixin as default };
