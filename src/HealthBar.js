class HealthBar {
  WIDTH = 50
  HEIGHT = 10

  constructor({ game, sprite }) {
    this.game = game
    this.sprite = sprite
  }

  position() {
    return [
      (2 * this.sprite.position[0] + this.sprite.WIDTH) / 2 - this.WIDTH / 2,
      this.sprite.position[1] - 30
    ]
  }

  draw() {
    let pos = this.position()
    let health = (this.sprite.HEALTH / 100) * this.WIDTH

    this.game.context.fillStyle = 'yellow'
    this.game.context.fillRect(...pos, this.WIDTH, this.HEIGHT)

    this.game.context.fillStyle = 'black'
    this.game.context.fillRect(
      pos[0] + 1,
      pos[1] + 1,
      health - 2,
      this.HEIGHT - 2
    )

    this.game.context.fillStyle = 'green'
    this.game.context.fillRect(
      pos[0] + 2,
      pos[1] + 2,
      health - 4,
      this.HEIGHT - 4
    )
  }
}

export default HealthBar
