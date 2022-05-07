import Sprite from '../classes/Sprite.js'
import SpriteImage from '../mixins/SpriteImage.js'

export default function ({ game }) {
  let image = {
    width: 118,
    height: 128
  }

  let frame = {
    count: 6,
    current: 1,
    hold: 5
  }

  return new Sprite({
    position: [500, 128],
    game,
    mixins: [
      [
        SpriteImage,
        [
          {
            img: 'assets/shop.png',
            dimensions: [image.width, image.height],
            crop: [0, 0, image.width, image.height],
            scale: 2.75,
            animation: function ({ crop }) {
              if (!(game.FRAME.ELAPSED % frame.hold)) {
                crop[0] = image.width * frame.current

                frame.current += 1
                frame.current %= frame.count
              }
            }
          }
        ]
      ]
    ]
  })
}
