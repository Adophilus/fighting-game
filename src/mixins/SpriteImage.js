const debug = false

export default function ({ img }) {
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
    this.game.context.drawImage(image, ...this.position)
  }
}
