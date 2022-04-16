class AttackBox {
  HEIGHT = 20
  WIDTH = 30

  constructor({ game, sprite }) {
    this.game = game
    this.sprite = sprite
  }

  position() {
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
    this.game.context.fillStyle = 'blue'
    this.game.context.fillRect(...this.position(), this.WIDTH, this.HEIGHT)
  }
}

export default AttackBox
