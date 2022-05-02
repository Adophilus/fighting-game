import AttackBox from './AttackBox.js'
import HealthBar from './HealthBar.js'

class Sprite {
  static ID = 0

  WIDTH = 25
  HEIGHT = 50
  VEL = 7
  GRAVITY = 9.8
  CONTROLS = {
    up: 'w',
    down: 's',
    left: 'a',
    right: 'd',
    attack: 'f'
  }
  MOVING = {
    up: false,
    down: false,
    left: false,
    right: false
  }
  AIRBORNE = false
  JUMPING = 0
  HEALTH = 100
  ATTACKING = false
  ATTACKED = false
  FACING = 1
  DEBUG = false

  constructor({ game, position, vel, controls }) {
    this.game = game
    this.position = position
    this.VEL = vel ? vel : this.VEL
    this.CONTROLS = controls ? controls : this.CONTROLS
    this.attackBox = new AttackBox({ sprite: this, game })
    this.healthBar = new HealthBar({ sprite: this, game })
    this.assignId()

    this.hookKeys()
  }

  assignId() {
    this.id = this.constructor.ID
    this.constructor.ID += 1
  }

  equals(obj) {
    return this.id === obj.id
  }

  // handle key events
  hookKeys() {
    window.addEventListener('keydown', (event) => {
      // console.log(event.key);

      if (event.key === this.CONTROLS.up) {
        this.MOVING.up = true
      } else if (event.key === this.CONTROLS.down) {
        this.MOVING.down = true
      }

      if (event.key === this.CONTROLS.left) {
        this.MOVING.left = true
      } else if (event.key === this.CONTROLS.right) {
        this.MOVING.right = true
      }

      if (event.key === this.CONTROLS.attack) {
        this.ATTACKING = true
      }
    })

    window.addEventListener('keyup', (event) => {
      // console.log(event.key);

      if (event.key === this.CONTROLS.up) {
        this.MOVING.up = false
      } else if (event.key === this.CONTROLS.down) {
        this.MOVING.down = false
      }

      if (event.key === this.CONTROLS.left) {
        this.MOVING.left = false
      } else if (event.key === this.CONTROLS.right) {
        this.MOVING.right = false
      }

      if (event.key === this.CONTROLS.attack) {
        this.ATTACKING = false
      }
    })
  }

  // handle sprite movement
  move(params = {}) {
    let { debug, force } = params

    this.moveUp({ debug })
    this.moveDown({ debug })
    this.moveLeft({ debug })
    this.moveRight({ debug })
  }

  moveUp({ force, vel, debug }) {
    if (this.JUMPING > 0) {
      let newPos = this.position[1] - (vel || 30)
      this.position[1] = newPos
      this.JUMPING -= 30
    } else {
      this.JUMPING = 0
    }

    if (this.MOVING.up || force) {
      if (!this.AIRBORNE) {
        this.JUMPING = 300
        this.AIRBORNE = true
      }
    }
  }

  moveDown({ force, vel, debug }) {
    if (this.MOVING.down || force) {
      let newPos = this.position[1] + (vel || this.VEL)
      let canGo = this.game.canGo({
        object: this,
        position: [this.position[0], newPos],
        reason: true
      })

      if (!canGo.status && canGo.reason.height > this.game.HEIGHT) {
        this.position[1] = this.game.HEIGHT - this.HEIGHT
        this.AIRBORNE = false
      } else if (!canGo.status && canGo.reason instanceof Sprite) {
        this.AIRBORNE = false
      } else {
        this.position[1] = newPos
      }
    }
  }

  moveLeft({ force, vel, debug }) {
    if (this.MOVING.left || force) {
      let newPos = this.position[0] - (vel || this.VEL)
      if (
        this.game.canGo({
          object: this,
          position: [newPos, this.position[1]],
          debug
        })
      ) {
        this.position[0] -= vel || this.VEL
      }
      this.FACING = -1
    }
  }

  moveRight({ force, vel, debug }) {
    if (this.MOVING.right || force) {
      let newPos = this.position[0] + (vel || this.VEL)
      if (
        this.game.canGo({
          object: this,
          position: [newPos, this.position[1]],
          debug
        })
      ) {
        this.position[0] += vel || this.VEL
      }
      this.FACING = 1
    }
  }

  // handle attack
  attack(params = {}) {
    let { force } = params
    if (this.ATTACKING || force) {
      this.attackBox.draw()
    }
  }

  // handle animation and collisions
  draw(params = {}) {
    let { debug } = params
    // handle movement
    this.move({ debug })

    // handle attack
    this.attack({ debug })

    // draw collision border
    this.game.context.fillStyle = 'deepskyblue'
    this.game.context.fillRect(
      this.position[0] - 2,
      this.position[1] - 2,
      this.WIDTH + 4,
      this.HEIGHT
    )

    // draw sprite
    this.game.context.fillStyle = 'red'
    this.game.context.fillRect(...this.position, this.WIDTH, this.HEIGHT)

    // draw healthBar
    this.healthBar.draw()

    // handle gravity
    this.moveDown({ force: true, vel: this.GRAVITY })
  }
}

export default Sprite
