import Sprite from '../classes/Sprite.js'
import SpriteAttack from '../mixins/SpriteAttack.js'
import SpriteAttackBox from '../mixins/SpriteAttackBox.js'
import SpriteColor from '../mixins/SpriteColor.js'
import SpriteDirection from '../mixins/SpriteDirection.js'
import SpriteGameHealthBar from '../mixins/SpriteGameHealthBar.js'
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
    height: 72,
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
    attack: false,
    attacked: false,
    idle: false,
    setAll(val) {
      for (let key of Object.keys(changed)) {
        if (key === 'setAll') {
          continue
        }
        changed[key] = val
      }
    }
  }

  let attacked = false
  let attacking = 0
  let attackingFrame = 4 // attackingFrame - 1
  let initializeAttack = null

  return new Sprite({
    position,
    game,
    dimensions: [37 * image.scale, (image.height - 20) * image.scale],
    mixins: [
      [SpriteHealth],
      [
        SpriteGameHealthBar,
        [
          {
            container: document.querySelector(
              '#gameContainer .health-container .player-health:nth-of-type(3)'
            )
          }
        ]
      ],
      [SpriteAttack],
      [
        SpriteAttackBox,
        [{ width: (56 + 5) * image.scale, height: 59 * image.scale }]
      ],
      [SpriteDirection],
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
              attacking: 'assets/samuraiMack/Attack1.png',
              attacked: 'assets/samuraiMack/Take Hit.png',
              death: 'assets/samuraiMack/Death.png',

              idleFlip: 'assets/samuraiMack/flip/Idle.png',
              jumpingFlip: 'assets/samuraiMack/flip/Jump.png',
              fallingFlip: 'assets/samuraiMack/flip/Fall.png',
              runningFlip: 'assets/samuraiMack/flip/Run.png',
              attackingFlip: 'assets/samuraiMack/flip/Attack1.png',
              attackedFlip:
                'assets/samuraiMack/flip/Take Hit.png',
              deathFlip: 'assets/samuraiMack/flip/Death.png'
            },
            dimensions: [image.width, image.height],
            crop: [...image.offset, image.width, image.height],
            scale: image.scale,
            animation: function ({ crop, position }) {
              if (this.DEAD) {
                if (!changed.death) {
                  frame.count = 6
                  frame.hold = 5
                  frame.current = 0

                  changed.setAll(false)
                  changed.death = true
                }

                if (changed.death && frame.current === 0) {
                  frame.current = frame.count - 1
                }
              } else {
                if (
                  !((changed.attack || changed.attacked) && frame.current !== 0)
                ) {
                  if (attacking) {
                    if (!changed.attack) {
                      frame.count = 6
                      frame.hold = 5
                      frame.current = 0

                      changed.setAll(false)
                      changed.attack = true
                    }

                    attacking -= 1
                    if (this.FACING === 1) {
                      this.switchSprite('attacking')
                    } else {
                      this.switchSprite('attackingFlip')
                    }
                  } else if (attacked) {
                    if (!changed.attacked) {
                      frame.count = 4
                      frame.hold = 5
                      frame.current = 0

                      changed.setAll(false)
                      changed.attacked = true
                    }

                    if (this.FACING === 1) {
                      this.switchSprite('attacked')
                    } else {
                      this.switchSprite('attackedFlip')
                    }
                  } else {
                    if (
                      !((changed.fall || changed.jump) && frame.current !== 0)
                    ) {
                      if (this.MOVING.up) {
                        if (!changed.up) {
                          frame.count = 2
                          frame.hold = 5
                          frame.current = 0

                          changed.setAll(false)
                          changed.up = true
                        }

                        if (this.FACING === 1) {
                          this.switchSprite('jumping')
                        } else {
                          this.switchSprite('jumpingFlip')
                        }
                      } else if (this.AIRBORNE) {
                        if (!changed.fall) {
                          frame.count = 2
                          frame.hold = 5
                          frame.current = 0

                          changed.setAll(false)
                          changed.fall = true
                        }

                        if (this.FACING === 1) {
                          this.switchSprite('falling')
                        } else {
                          this.switchSprite('fallingFlip')
                        }
                      } else if (this.MOVING.left || this.MOVING.right) {
                        if (!changed.side) {
                          frame.count = 8
                          frame.hold = 5
                          frame.current = 0

                          changed.setAll(false)
                          changed.side = true
                        }

                        if (this.FACING === 1) {
                          this.switchSprite('running')
                        } else {
                          this.switchSprite('runningFlip')
                        }
                      } else {
                        if (!changed.idle) {
                          frame.count = 8
                          frame.hold = 5
                          frame.current = 0

                        changed.setAll(false)
                        changed.idle = true
                        }

                        if (this.FACING === 1) {
                          this.switchSprite('idle')
                        } else {
                          this.switchSprite('idleFlip')
                        }
                      }
                    }
                  }
                }

                if (changed.attack) {
                  if (frame.current === attackingFrame) {
                    initializeAttack()
                  }
                } else if (changed.attacked) {
                  if (frame.current === frame.count - 1) {
                    attacked = false
                  }
                }
              }

              if (this.FACING === 1) {
                image.offset[0] = 76
              } else {
                image.offset[0] = 10
                position[0] -= image.width + 65
              }

              if (!(game.FRAME.ELAPSED % frame.hold)) {
                crop[0] = image.sectionWidth * frame.current + image.offset[0]

                frame.current += 1
                frame.current %= frame.count
              }

              position[1] -= 50
            }
          }
        ]
      ],
      [SpriteStats, [{ atk: 6 }]],
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
    .on('attack', (initAttack) => {
      initializeAttack = initAttack
      if (!attacking) attacking = 5
    })
    .on('attacked', () => {
      if (!attacked) attacked = true
    })
    .on('death', function () {
      if (this.FACING === 1) {
        this.switchSprite('death')
      } else {
        this.switchSprite('deathFlip')
      }
    })
}
