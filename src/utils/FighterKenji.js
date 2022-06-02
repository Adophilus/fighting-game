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
    sectionHeight: 200,
    width: 115,
    height: 67,
    offset: [70, 62],
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
    death: false,
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

  const sprite = {
    width: 22,
    height: image.height - 10
  }

  let attacked = false
  let attacking = 0
  let attackingFrame = 3 // attackingFrame - 1
  let initializeAttack = null

  return new Sprite({
    position,
    game,
    dimensions: [sprite.width * image.scale, sprite.height * image.scale],
    mixins: [
      [SpriteHealth],
      [SpriteColor, [{ outline: 'yellow', width: image.width * image.scale }]],
      [
        SpriteGameHealthBar,
        [
          {
            container: document.querySelector(
              '#gameContainer .health-container .player-health:nth-of-type(1)'
            )
          }
        ]
      ],
      [SpriteAttack],
      [
        SpriteAttackBox,
        [
          {
            width: 70 * image.scale,
            height: sprite.height * image.scale
          }
        ]
      ],
      [SpriteDirection],
      [
        SpriteImage,
        [
          {
            img: {
              default: 'idle',
              idle: 'assets/kenji/Idle.png',
              jumping: 'assets/kenji/Jump.png',
              falling: 'assets/kenji/Fall.png',
              running: 'assets/kenji/Run.png',
              attacking: 'assets/kenji/Attack1.png',
              attacked: 'assets/kenji/Take hit.png',
              death: 'assets/kenji/Death.png',

              idleFlip: 'assets/kenji/flip/Idle.png',
              jumpingFlip: 'assets/kenji/flip/Jump.png',
              fallingFlip: 'assets/kenji/flip/Fall.png',
              runningFlip: 'assets/kenji/flip/Run.png',
              attackingFlip: 'assets/kenji/flip/Attack1.png',
              attackedFlip: 'assets/kenji/flip/Take hit.png',
              deathFlip: 'assets/kenji/flip/Death.png'
            },
            dimensions: [image.width, image.height],
            crop: [...image.offset, image.width, image.height],
            scale: image.scale,
            animation: function ({ crop, position }) {
              if (this.DEAD) {
                if (!changed.death) {
                  frame.count = 7
                  frame.hold = 5
                  frame.current = 0

                  changed.setAll(false)
                  changed.death = true
                }

                if (changed.death && frame.current === 0) {
                  frame.current = frame.count - 1
                  crop[2] = 150
                }
              } else {
                if (
                  !((changed.attack || changed.attacked) && frame.current !== 0)
                ) {
                  if (attacking) {
                    if (!changed.attack) {
                      frame.count = 4
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
                      frame.count = 3
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
                          frame.count = 4
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

              position[1] -= 20

              if (this.FACING === 1) {
                image.offset[0] = 70
                position[0] -= 40
              } else {
                image.offset[0] = 10
                position[0] -= 200
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
      [SpriteStats, [{ atk: 5 }]],
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
      if (!attacking) attacking = 3
    })
    .on('attacked', () => {
      if (!attacked) attacked = true
    })
    .on('death', function () {
      this.switchSprite('death')
    })
}
