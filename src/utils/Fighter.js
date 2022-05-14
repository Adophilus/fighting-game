import Sprite from '../classes/Sprite.js'
import SpriteAttack from '../mixins/SpriteAttack.js'
import SpriteColor from '../mixins/SpriteColor.js'
import SpriteHealth from '../mixins/SpriteHealth.js'
import SpriteImage from '../mixins/SpriteImage.js'
import SpriteMovement from '../mixins/SpriteMovement.js'
import SpriteStats from '../mixins/SpriteStats.js'

export default function ({ game, position, controls }) {
  let image = {
    fullWidth: 1600,
    fullHeight: 200,
    sectionWidth: 200, // fullWidth / frame.count
    width: 195, // 37,
    height: 70, // 52
    offset: [76, 50], // [76, 70],
    scale: 2.5
  }

  let frame = {
    count: 8,
    current: 1,
    hold: 5
  }

  const runningImage = new Image()
  runningImage.src = 'assets/samuraiMack/Run.png'

  const jumpingImage = new Image()
  jumpingImage.src = 'assets/samuraiMack/Jump.png'

  const fallingImage = new Image()
  fallingImage.src = 'assets/samuraiMack/Fall.png'

  const attackingImage1 = new Image()
  attackingImage1.src = 'assets/samuraiMack/Attack1.png'

  const changed = {
    up: false,
    side: false,
    fall: false,
    attack: false
  }

  return new Sprite({
    position,
    game,
    dimensions: [37 * image.scale, image.height * image.scale],
    mixins: [
      [SpriteHealth],
      [SpriteAttack],
      [
        SpriteImage,
        [
          {
            img: 'assets/samuraiMack/Idle.png',
            dimensions: [image.width, image.height],
            crop: [...image.offset, image.width, image.height],
            scale: image.scale,
            animation: function ({ crop, params }) {
              if (!(changed.attack && frame.current !== 0)) {
                if (this.ATTACKING) {
                  if (!changed.attack) {
                    frame.count = 6
                    frame.hold = 5
                    frame.current = 0
                    changed.up = false
                    changed.side = false
                    changed.fall = false
                    changed.attack = true
                  }

                  params[0] = attackingImage1
                } else {
                  if (
                    !((changed.fall || changed.jump) && frame.current !== 0)
                  ) {
                    if (this.MOVING.up) {
                      if (!changed.up) {
                        frame.count = 2
                        frame.hold = 5
                        frame.current = 0
                        changed.up = true
                        changed.side = false
                        changed.fall = false
                        changed.attack = false
                      }

                      params[0] = jumpingImage
                    } else if (this.AIRBORNE) {
                      if (!changed.fall) {
                        frame.count = 2
                        frame.hold = 5
                        frame.current = 0
                        changed.up = false
                        changed.side = false
                        changed.fall = true
                        changed.attack = false
                      }

                      params[0] = fallingImage
                    } else if (this.MOVING.left || this.MOVING.right) {
                      if (!changed.side) {
                        frame.count = 8
                        frame.hold = 5
                        frame.current = 0
                        changed.up = false
                        changed.side = true
                        changed.fall = false
                        changed.attack = false
                      }

                      params[0] = runningImage
                    } else {
                      frame.count = 8
                      frame.hold = 5
                      changed.up = false
                      changed.side = false
                      changed.fall = false
                      changed.attack = false
                    }
                  }
                }
              }

              if (!(game.FRAME.ELAPSED % frame.hold)) {
                crop[0] = image.sectionWidth * frame.current + image.offset[0]

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
