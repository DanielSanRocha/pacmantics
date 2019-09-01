import * as PIXI from 'pixi.js'
import ResourceManger from './ResourceManager.js'
import Pacman from './Pacman.js'
import KeyboardController from './KeyboardController.js'
import Ghost from './Ghost.js'

export default class Game {
  constructor (size) {
    this.tick = this.tick.bind(this)
    this.instantiateObjects = this.instantiateObjects.bind(this)

    const { width, height } = size
    this.size = { width, height }

    this.app = new PIXI.Application({
      width: width,
      height: height,
      backgroundColor: 0x0,
      resolution: window.devicePixelRatio || 1
    })

    this.createContainer()

    this.resourceManager = new ResourceManger()
    this.resourceManager.load().then(() => {
      this.instantiateObjects()

      // Listen for animate update
      this.app.ticker.add(this.tick)

      // Bind Keys
      this.bindKeyboard()

      // Add Container to app
      this.app.stage.addChild(this.container)
    })
  }

  bindKeyboard () {
    KeyboardController.listen('ArrowUp',
      () => {
        this.pacman.setDirection('up')
      }, () => {})

    KeyboardController.listen('ArrowDown',
      () => {
        this.pacman.setDirection('down')
      }, () => {})

    KeyboardController.listen('ArrowLeft',
      () => {
        this.pacman.setDirection('left')
      }, () => {})

    KeyboardController.listen('ArrowRight',
      () => {
        this.pacman.setDirection('right')
      }, () => {})
  }

  // Create Container and move it to the center of the app
  createContainer (size) {
    this.container = new PIXI.Container()
    this.container.x = this.size.width / 2
    this.container.y = this.size.height / 2
  }

  instantiateObjects () {
    this.pacman = new Pacman({ x: 0, y: 0, direction: 'right' }, this.container, this.resourceManager)
    this.ghosts = [
      new Ghost('blue', { x: 0, y: 0, direction: 'up' }, this.container, this.resourceManager),
      new Ghost('red', { x: 10, y: 15, direction: 'left' }, this.container, this.resourceManager)
    ]
  }

  tick (delta) {
    this.pacman.tick(delta)
    this.ghosts.forEach(ghost => ghost.tick(delta))
  }

  addToElement (element) {
    element.appendChild(this.app.view)
  }
}
