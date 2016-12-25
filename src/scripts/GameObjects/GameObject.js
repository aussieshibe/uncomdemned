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
 * The GameObject class, intended to be extended
 * Contains all functions / properties that all game objects will have
 */
class GameObject extends THREE.Object3D{
  constructor() {
    super();
    this.physicsBody = new CANNON.Body({mass: 1});
    this.physicsBody.position.set(0, 0, 0);
  }

  /**
   * Update this GameObject based on delta time
   * @param {number} delta Delta time (ms)
   */
  update(delta) {
    // Copy physics positions and rotations to this Object
    this.position.x = this.physicsBody.position.x;
    this.position.y = this.physicsBody.position.y;
    this.position.z = this.physicsBody.position.z;
    this.quaternion.x = this.physicsBody.quaternion.x;
    this.quaternion.y = this.physicsBody.quaternion.y;
    this.quaternion.z = this.physicsBody.quaternion.z;
    this.quaternion.w = this.physicsBody.quaternion.w;
  }

}

export { GameObject as default };
