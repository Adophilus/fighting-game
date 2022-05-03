class HealthBar {
  WIDTH = 50
  HEIGHT = 10
  SHOW = true

  constructor({ game, sprite }) {
    this.game = game
    this.sprite = sprite
  }

  __setPosition() {
    return [
      (2 * this.sprite.position[0] + this.sprite.WIDTH) / 2 - this.WIDTH / 2,
      this.sprite.position[1] - 30
    ]
  }

  draw() {
    if (this.SHOW) {
      this.position = this.__setPosition()
      let health = (this.sprite.HEALTH / 100) * this.WIDTH

      this.game.context.fillStyle = 'yellow'
      this.game.context.fillRect(...this.position, this.WIDTH, this.HEIGHT)

      if (health > 0) {
        this.game.context.fillStyle = 'black'
        this.game.context.fillRect(
          this.position[0] + 1,
          this.position[1] + 1,
          health - 2,
          this.HEIGHT - 2
        )
      }

      if (health > 0) {
        this.game.context.fillStyle = 'green'
        this.game.context.fillRect(
          this.position[0] + 2,
          this.position[1] + 2,
          health - 4,
          this.HEIGHT - 4
        )
      }
    }
  }
}

export default HealthBar
