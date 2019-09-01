import * as PIXI from 'pixi.js'

export default class ResourceManager {
  constructor () {
    this.setup = this.setup.bind(this)
    this.load = this.load.bind(this)

    this.ready = false
  }

  load () {
    return new Promise(resolve => {
      PIXI.Loader.shared.add('assets/spritesheet.json').load((a) => {
        this.setup()
        resolve()
      })
    })
  }

  setup () {
    this.ready = true
    this.sheet = PIXI.Loader.shared.resources['assets/spritesheet.json'].spritesheet
  }

  checkReady () {
    if (!this.ready) {
      throw new Error('ResourceManager is not ready yet!')
    }
  }

  getTexture (name) {
    this.checkReady()

    const texture = this.sheet.textures[name]
    if (!texture) {
      throw Error(`Texture with name ${name} not found!`)
    }

    return texture
  }

  getAnimation (name) {
    this.checkReady()

    const animation = this.sheet.animations[name]
    if (!animation) {
      throw new Error(`Animation with name ${name} not found!`)
    }

    return animation
  }
}
