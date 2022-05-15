const debug = false

export default function ({
  img,
  dimensions = [],
  crop = [],
  scale = 1,
  animation
}) {
  let params = {
    image: null,
    crop,
    dimensions
  }

  for (let image in img) {
    if (image === 'default') {
      continue
    }

    let imageSrc = img[image]
    img[image] = new Image()
    img[image].src = imageSrc
  }

  params.image = img[img.default]

  // handle sprite switching
  this.switchSprite = (image) => {
    params.image = img[image]
  }

  // handle drawing
  let draw = this.draw
  this.draw = () => {
    draw.apply(this)

    if (animation) {
      animation.apply(this, [params])
    }

    this.game.context.drawImage(
      ...[
        params.image,
        ...params.crop,
        ...this.position,
        ...params.dimensions.map((dimension) => dimension * scale)
      ]
    )
  }
}
