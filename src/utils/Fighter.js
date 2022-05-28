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
    width: 124, // 37,
    height: 70 + 22, // 52
    offset: [76, 50], // [76, 70],
    scale: 2.5
  }

  let frame = {
    count: 8,
    current: 1,
    hold: 5
  }

  const changed = {
    up: false,
    side: false,
    fall: false,
    attack: false
  }

  return new Sprite({
    position,
    game,
    dimensions: [37 * image.scale, 70 * image.scale],
    mixins: [
      [SpriteHealth],
      [SpriteAttack],
      [
        SpriteImage,
        [
          {
            img: {
              default: 'idle',
              idle: 'assets/samuraiMack/Idle.png',
              jumping: 'assets/samuraiMack/Jump.png',
              falling: 'assets/samuraiMack/Fall.png',
              running: 'assets/samuraiMack/Run.png',
              attacking: 'assets/samuraiMack/Attack1.png'
            },
            dimensions: [image.width, image.height],
            crop: [...image.offset, image.width, image.height],
            scale: image.scale,
            animation: function ({ crop }) {
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

                  this.switchSprite('attacking')
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

                      this.switchSprite('jumping')
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

                      this.switchSprite('falling')
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

                      this.switchSprite('running')
                    } else {
                      frame.count = 8
                      frame.hold = 5
                      changed.up = false
                      changed.side = false
                      changed.fall = false
                      changed.attack = false
                      this.switchSprite('idle')
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
