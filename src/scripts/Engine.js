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

import GameTimer from './GameTimer';
import SceneHandler from './SceneHandler';
import ViewRenderer from './ViewRenderer';

/**
 * The Engine class, manages all aspects of the game
 */
class Engine {
  /**
   * Constructor for the game engine
   * @param {Element} canvas The HTML canvas to render on
   */
  constructor(canvas) {
    this.timer = new GameTimer();
    this.sceneHandler = new SceneHandler();
    this.sceneHandler.init();
    this.renderer = new ViewRenderer({
        canvas: canvas,
        scene: this.sceneHandler.scene,
        world: this.sceneHandler.world});
  }

  /**
   * Run one game tick, normally will be called by requestUpdateFrame
   * from app.js
   */
  tick() {
    this.timer.update();
    this.sceneHandler.update(this.timer.deltaTime);
    this.renderer.update();
    this.renderer.render(this.sceneHandler);
  }

}

export { Engine as default };
