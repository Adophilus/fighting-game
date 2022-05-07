const debug = false

export default function ({ img, dimensions, crop, scale = 1, animation }) {
  // handle drawing
  let draw = this.draw
  this.draw = () => {
    draw.apply(this)

    let image = new Image()
    if (img instanceof Image) {
      image = img
    } else {
      image.src = img
    }

    let params = [image, ...this.position]

    if (animation) {
      animation.apply(this, [{ params, crop, dimensions }])
    }

    if (crop) {
      params.splice(1, 2)
      params.push(...crop)
      params.push(...this.position)
    }
    if (dimensions) {
      params.push(dimensions[0] * scale)
      params.push(dimensions[1] * scale)
    }

    this.game.context.drawImage(...params)
  }
}
