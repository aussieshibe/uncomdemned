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

import GameObject from '../GameObject';
import InputHandler from './InputHandler';

/**
 * Player class, manages functionality related to the player, e.g.
 *  - Player camera
 *  - Movement
 */
class Player extends GameObject {
  /**
   * Constructor for Player class
   */
  constructor() {
    super();
    // View ranges in radians, must be < 90 degrees to avoid Weird Stuff(tm)
    this.MAX_VIEW_PITCH = 80 * (Math.PI / 180);
    this.MIN_VIEW_PITCH = -80 * (Math.PI / 180);
    this.name = 'Player';
    this._setupCamera();
    this._inputHandler = new InputHandler();

    // Physics
    this.physicsBody.mass = 5;
    this.physicsBody.position.set(0, 0, 300);
    var physMesh = new CANNON.Box(new CANNON.Vec3(20, 100, 20));
    this.physicsBody.addShape(physMesh);

  }

  /**
   * Player specific update functionality
   */
  update(delta) {
    // Calculate desired movement and apply to the physicsBody
    var mov =
        this._inputHandler
            .getMovement()
            .applyQuaternion(this.quaternion)
            .multiplyScalar(100);
    this.physicsBody.velocity.x = mov.x;
    this.physicsBody.velocity.z = mov.z;

    // Update player view rotation based on input from InputHandler
    var mouseMov = this._inputHandler.getRotation();
    // Clamp newPitch within MAX_VIEW_PITCH and MIN_VIEW_PITCH
    var newPitch =
        Math.min(
          this.MAX_VIEW_PITCH,
          Math.max(
            this.MIN_VIEW_PITCH,
            this._pitchObject.rotation.x - mouseMov.y));

    // Apply rotations to Player/_pitchObject
    this.rotateY(-mouseMov.x);
    this._pitchObject.rotation.x = newPitch;

    // Apply our rotation to the physics object
    this.physicsBody.quaternion.x = this.quaternion.x;
    this.physicsBody.quaternion.y = this.quaternion.y;
    this.physicsBody.quaternion.z = this.quaternion.z;
    this.physicsBody.quaternion.w = this.quaternion.w;

    // Now that we've updated our physics object with the correct rotations,
    // we can call super.update. If we do this in the other order, the main
    // player object can rotate around non-Y axes (a.k.a. fall over)
    super.update(delta);
  }

  /**
   * Setup the camera
   * Camera rotation and positioning works by using nested objects as follows:
   *  * Player
   *   * _pitchObject
   *    * camera
   * Movement: move the Player GameObject
   * Camera yaw: rotate the Player GameObject
   * Camera pitch: rotate the _pitchObject on the X axis
   *  - - - -
   * This way, the nested THREE.Object3Ds handle the heavy lifting for
   * calculating the pitch of the camera on the X/Z axes
   */
  _setupCamera() {
    // Create the camera
    this.camera =
        new THREE.PerspectiveCamera(
            70,
            window.innerWidth / window.innerHeight,
            0.1,
            3000);
    this.camera.name = 'camera';
    // Create the pitch object
    this._pitchObject = new THREE.Object3D();
    this._pitchObject.name = '_pitchObject';
    // Add the camera as a child of the pitch object
    this._pitchObject.add(this.camera);
    this._pitchObject.position.y = 10;
    // Add the pitch object as a child of the Player
    this.add(this._pitchObject);
  }
}

export { Player as default };
