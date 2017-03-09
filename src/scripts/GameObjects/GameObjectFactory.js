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
import DrawableMixinFactory from './Mixins/DrawableMixinFactory';
import RigidbodyMixinFactory from './Mixins/RigidbodyMixinFactory';

/**
 * The GameObjectFactory class
 * GameObjectFactories create a GameObject and add any necessary mixins
 */
class GameObjectFactory {
  constructor() {
    this._DrawableMixinFactory = new DrawableMixinFactory();
    this._RigidbodyMixinFactory = new RigidbodyMixinFactory();
  }

  /**
   * The build function for GameObjectFactory
   * Creates GameObjects based on passed options
   *
   * @param {Object} options The options for the GameObject
   * @param {Object} base The base options which apply to all modules
   * @param {THREE.Vector3} position The position of the object
   * @param {Object} drawable The options for the DrawableMixin if applicable
   * @param {string} drawable.objFile The relative path to the objFile
   * @param {Object} rigidbody The options for the RigidbodyMixin if applicable
   * @param {string} rigidbody.colliderFile The relative path to colliderFile
   */
  build(options) {
    return new Promise((resolve, reject) => {
      // Create base GameObject
      resolve(new GameObject());
    }).then((gameObject) => {
      // Setup DrawableMixin if required
      if (options.drawable) {
        gameObject.add(this._DrawableMixinFactory.build(options.drawable));
      }
      return gameObject;
    }).then((gameObject) => {
      // Setup RigidbodyMixin if required
      if (options.rigidbody) {
        return new Promise((resolve, reject) => {
          this._RigidbodyMixinFactory.build(options.base, options.rigidbody)
              .then((rigidbodyMixin) => {
                gameObject.rigidbody = rigidbodyMixin;
                var update = gameObject.update;
                gameObject.update = function(delta) {
                  gameObject.rigidbody.update(gameObject, delta);
                  update();
                };
                resolve(gameObject);
              });
        });
      } else {
        return gameObject;
      }
    });
    //return promise;
  }

}

var GOF = new GameObjectFactory();

export { GOF as default };
