const debug = false

export default function ({ fill, outline }) {
  // handle drawing
  let draw = this.draw
  this.draw = () => {
    draw.apply(this)

    // draw collision border
    this.game.context.fillStyle = outline
    this.game.context.fillRect(
      this.position[0] - 2,
      this.position[1] - 2,
      this.WIDTH + 4,
      this.HEIGHT
    )

    // draw sprite
    this.game.context.fillStyle = fill
    this.game.context.fillRect(...this.position, this.WIDTH, this.HEIGHT)
  }
}
