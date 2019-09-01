import * as PIXI from 'pixi.js'

const animationInterval = 50
const imageScale = 0.3
const defaultVelocity = 1
const directions = ['up', 'down', 'left', 'right']

export default class MovableObject {
  constructor (spriteName, params, container, resourceManager) {
    this.spriteName = spriteName

    this.loadAnimations(resourceManager)

    this.sprite = new PIXI.Sprite()

    this.imageScale = params.imageScale || imageScale
    this.sprite.scale.set(this.imageScale, this.imageScale)

    this.animationInterval = params.animationInterval || animationInterval
    this.animationDelta = 0

    this.sprite.x = params.x || 0.0
    this.sprite.y = params.y || 0.0
    this.velocity = params.velocity || defaultVelocity
    this.setDirection(params.direction || 'right')

    this.container = container
    container.addChild(this.sprite)
  }

  loadAnimations (resourceManager) {
    this.animations = {}

    directions.forEach((direction) => {
      this.animations[direction] = resourceManager.getAnimation(`${this.spriteName}-${direction}`)
    })

    return true
  }

  tick (delta) {
    this.animationDelta += delta

    const currentFrame = Math.round(this.textures.length * this.animationDelta / this.animationInterval) % this.textures.length
    this.sprite.texture = this.textures[currentFrame]

    this.move(delta)
  }

  setDirection (direction) {
    if (!directions.includes(direction)) {
      throw new Error(`Invalid direction '${direction}' for movable object with name '${this.spriteName}'!`)
    }

    this.direction = direction
    this.textures = this.animations[direction]
  }

  move (delta) {
    switch (this.direction) {
      case 'right': this.sprite.x += this.velocity * delta; break
      case 'left': this.sprite.x -= this.velocity * delta; break
      case 'up': this.sprite.y -= this.velocity * delta; break
      case 'down': this.sprite.y += this.velocity * delta; break
      default: throw new Error(`Invalid direction ${this.direction} for movable object with name '${this.spriteName}'`)
    }
  }
}
