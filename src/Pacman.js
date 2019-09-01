// import * as PIXI from 'pixi.js'
import MovableObject from './MovableObject'

const animationInterval = 15
const defaultVelocity = 2

export default class Pacman extends MovableObject {
  constructor (params, container, resourceManager) {
    params.animationInterval = params.animationInterval || animationInterval
    params.velocity = params.defaultVelocity || defaultVelocity

    super('pacman', params, container, resourceManager)
  }

  tick (delta) {
    super.tick(delta)
  }
}
