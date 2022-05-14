import Sprite from '../classes/Sprite.js'
import SpriteAttack from '../mixins/SpriteAttack.js'
import SpriteColor from '../mixins/SpriteColor.js'
import SpriteHealth from '../mixins/SpriteHealth.js'
import SpriteImage from '../mixins/SpriteImage.js'
import SpriteMovement from '../mixins/SpriteMovement.js'
import SpriteStats from '../mixins/SpriteStats.js'

export default function ({ game, position, controls }) {
  // 1600 x 200
  
  let image = {
    width: 37,
    height: 52,
    offset: [76, 70],
    scale: 2.5
  }

  let frame = {
    count: 8,
    current: 1,
    hold: 5
  }

  return new Sprite({
    position,
    game,
    dimensions: [ image.width * image.scale, image.height * image.scale],
    mixins: [
      [SpriteHealth],
      [SpriteAttack],
      [
        SpriteImage,
        [
          {
            img: 'assets/samuraiMack/Idle.png',
            dimensions: [
              image.width,
              image.height
            ],
            crop: [...image.offset, image.width, image.height],
            scale: image.scale,
            animation: function ({ crop }) {
              if (!(game.FRAME.ELAPSED % frame.hold)) {
                crop[0] = image.width * frame.current + image.offset[0]

                frame.current += 1
                frame.current %= frame.count
              }
            }
          }
        ]
      ],
      // [SpriteColor, [{ fill: 'black', outline: 'yellow' }]],
      [SpriteStats],
      [
        SpriteMovement,
        [
          {
            controls
          }
        ]
      ]
    ]
  })
}
