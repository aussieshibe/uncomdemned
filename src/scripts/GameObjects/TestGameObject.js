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

/**
 * A test of the GameObject class
 * Simply generates a rotating cube
 */
class TestGameObject extends GameObject{
  /**
   * Constructor for TestGameObject
   */
  constructor() {
    super();
    var geometry = new THREE.CubeGeometry(100, 100, 100);
    var material = new THREE.MeshLambertMaterial({color: 0x48fa3f});
    this.mesh = new THREE.Mesh(geometry, material);
    this.position.set(0, 0, -1000);
    this.name = 'TestGameObject';
    this.add(this.mesh);
  }

  /**
   * Update the TestGameObject based on delta time
   */
  update(delta) {
    super.update(delta);
    this.mesh.position
        .set(this.position.x, this.position.y, this.position.z);
    this.mesh.rotation
        .set(this.rotation.x, this.rotation.y, this.rotation.z);

    //this.velocity.x = 100;
    //this.rotation.x += 0.1 * delta / 1000;
    //this.rotation.y += 0.2 * delta / 1000;
    //this.rotation.z += 0.3 * delta / 1000;
  }
}

export { TestGameObject as default };
