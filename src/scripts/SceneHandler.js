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

import TestFloor from './GameObjects/Test/TestFloor';
import GameObjectFactory from './GameObjects/GameObjectFactory';
import Player from './GameObjects/Player/Player';

/**
 * The SceneHandler class bundles all objects together into a scene
 */
class SceneHandler {

  /**
   * Constructor for SceneHandler
   */
  constructor() {
    this.scene = new THREE.Scene();
    this.scene.name = 'Scene';

    this.world = new CANNON.World();
    this.world.gravity.set(0, -20, 0);

    //this.gameObjectFactory = new GameObjectFactory();

    this.gameObjects = [];

    // Export our scene for debugging with Three.js inspector
    window.scene = this.scene;
  }

  /**
   * Initialise the SceneHandler
   */
  init() {
    // Player object, only here for testing
    this.player = new Player();
    this.gameObjects.push(this.player);
    this.scene.add(this.player);
    this.world.add(this.player.physicsBody);

    // Testing lights
    var light = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(light);
    var plight = new THREE.PointLight(0xffffff, 0.5);
    plight.position.x = 300;
    plight.position.z = 200;
    this.scene.add(plight);

    // Testing floor
    var testFloor = new TestFloor();
    this.scene.add(testFloor);
    this.gameObjects.push(testFloor);
    this.world.add(testFloor.physicsBody);

    for (var x = 0; x < 5; x++) {
      for (var y = 0; y < 5; y++) {
        for (var z = 0; z < 5; z++) {
          // Testing GameObjectFactory
          var newObject = GameObjectFactory.build({
              base: {
                position: new THREE.Vector3(x * 100, y * 100, z * -100)
              },
              drawable: {},
              rigidbody: {}
            });
          this.scene.add(newObject);
          this.world.add(newObject.rigidbody);
          this.gameObjects.push(newObject);
        }
      }
    }
  }

  /**
   * Update the scene
   * @param {number} delta
   */
  update(delta) {
    this.world.step(delta);
    for (var go of this.gameObjects) {
      go.update(delta);
    }
  }

}

export { SceneHandler as default };
