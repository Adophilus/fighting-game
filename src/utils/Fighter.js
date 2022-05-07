import Sprite from '../classes/Sprite.js'
import SpriteAttack from '../mixins/SpriteAttack.js'
import SpriteColor from '../mixins/SpriteColor.js'
import SpriteHealth from '../mixins/SpriteHealth.js'
import SpriteImage from '../mixins/SpriteImage.js'
import SpriteMovement from '../mixins/SpriteMovement.js'
import SpriteStats from '../mixins/SpriteStats.js'

export default function ({ game, position, controls }) {
  let image = {
    width: 118,
    height: 128,
    offset: [215, 180]
  }

  let frame = {
    count: 8,
    current: 1,
    hold: 5
  }

  return new Sprite({
    position,
    game,
    mixins: [
      [SpriteHealth],
      [SpriteAttack],
      [
        SpriteImage,
        [
          {
            img: 'assets/samuraiMack/Idle.png',
            dimensions: [
              image.width - image.offset[0],
              image.height - image.offset[1]
            ],
            crop: [0, 0, image.width, image.height],
            scale: 2.5
            // animation: function ({ crop }) {
            //   if (!(game.FRAME.ELAPSED % frame.hold)) {
            //     crop[0] = image.width * frame.current

            //     frame.current += 1
            //     frame.current %= frame.count
            //   }
            // }
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
