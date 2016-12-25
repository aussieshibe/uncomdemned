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

import GameObject from './GameObject';
import DrawableMixin from './Mixins/DrawableMixin';
import RigidbodyMixin from './Mixins/RigidbodyMixin';

/**
 * The GameObjectFactory class
 * GameObjectFactories create a GameObject and add any necessary mixins
 */
class GameObjectFactory {
  constructor() {
  }

  build(options) {
    var go = new GameObject();
    if (options.drawable) {
      go.mesh = new DrawableMixin(options.base, options.drawable);
      // Add the new mesh to the parent GameObject
      go.add(go.mesh);
    }
    if (options.rigidbody) {
      go.rigidbody = new RigidbodyMixin(options.base, options.rigidbody);
      var update = go.update;
      go.update = function(delta) {
        go.rigidbody.update(go, delta);
        update();
      };
    }
    return go;
  }

}

var GOF = new GameObjectFactory();

export { GOF as default };
