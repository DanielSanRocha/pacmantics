// import * as PIXI from 'pixi.js'
import MovableObject from './MovableObject'

const animationInterval = 15
const defaultVelocity = 1
const colors = ['red', 'blue']

export default class Ghost extends MovableObject {
  constructor (color, params, container, resourceManager) {
    if (!colors.includes(color)) {
      throw new Error(`Invalid color '${color}' for Ghost!`)
    }

    params.animationInterval = params.animationInterval || animationInterval
    params.velocity = params.defaultVelocity || defaultVelocity

    super(`ghost-${color}`, params, container, resourceManager)
  }

  tick (delta) {
    super.tick(delta)
  }
}
