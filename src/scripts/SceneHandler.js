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

import TestGameObject from './GameObjects/TestGameObject';
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

    // Testing lights
    var light = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(light);
    var plight = new THREE.PointLight(0xffffff, 0.5);
    plight.position.x = 300;
    plight.position.z = 200;
    this.scene.add(plight);

    // Testing object
    var testObject = new TestGameObject();
    this.scene.add(testObject);
    this.gameObjects.push(testObject);
  }

  /**
   * Update the scene
   * @param {number} delta
   */
  update(delta) {
    for (var go of this.gameObjects) {
      go.update(delta);
    }
  }

}

export { SceneHandler as default };
