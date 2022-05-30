class AttackBox {
  static ID = 100
  HEIGHT = 20
  WIDTH = 30

  constructor({ game, sprite, width, height, fill }) {
    this.game = game
    this.sprite = sprite
    this.fill = fill

    this.WIDTH = width
    this.HEIGHT = height

    this.position = this.__setPosition()
    this.__assignId()
  }

  __assignId() {
    this.id = ++this.constructor.ID
  }

  equals(obj) {
    return this.id === obj.id
  }

  __setPosition() {
    if (this.sprite.FACING === 1) {
      return [
        this.sprite.position[0] + this.sprite.WIDTH,
        this.sprite.position[1]
      ]
    } else {
      return [this.sprite.position[0] - this.WIDTH, this.sprite.position[1]]
    }
  }

  draw() {
    this.position = this.__setPosition()

    if (this.fill) {
      this.game.context.fillStyle = 'blue'
      this.game.context.fillRect(...this.position, this.WIDTH, this.HEIGHT)
    }
  }
}

export default AttackBox
