const debug = false

export default function ({ fill, outline, width, height }) {
  width = width || this.WIDTH
  height = height || this.HEIGHT

  // handle drawing
  let draw = this.draw
  this.draw = () => {
    draw.apply(this)

    // draw collision border
    if (outline) {
      this.game.context.fillStyle = outline
      this.game.context.fillRect(
        this.position[0] - 2,
        this.position[1] - 2,
        width + 4,
        height
      )
    }

    // draw sprite
    if (fill) {
      this.game.context.fillStyle = fill
      this.game.context.fillRect(...this.position, width, height)
    }
  }
}
