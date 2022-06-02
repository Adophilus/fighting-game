import Sprite from '../classes/Sprite.js'

const debug = false

export default function ({ vel, controls }) {
  this.VEL = 7
  this.MOVING = {
    up: false,
    down: false,
    left: false,
    right: false
  }
  this.AIRBORNE = false
  this.JUMPING = 0

  // handle key events
  let __hookKeys = () => {
    window.addEventListener('keydown', (event) => {
      // console.log(event.key);

      if (this.DEAD || this.END) {
        return
      }

      if (event.key === this.CONTROLS.up) {
        this.MOVING.up = true
        this.trigger('move', { direction: 'up' })
      } else if (event.key === this.CONTROLS.down) {
        this.MOVING.down = true
        this.trigger('move', { direction: 'down' })
      }

      if (event.key === this.CONTROLS.left) {
        this.MOVING.left = true
        this.trigger('move', { direction: 'left' })
      } else if (event.key === this.CONTROLS.right) {
        this.MOVING.right = true
        this.trigger('move', { direction: 'right' })
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
    })
  }

  // handle sprite movement
  this.move = (params = {}) => {
    let { debug, force } = params

    this.moveUp({ debug })
    this.moveDown({ debug })
    this.moveLeft({ debug })
    this.moveRight({ debug })
  }

  this.moveUp = ({ force, vel, debug }) => {
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

  this.moveDown = ({ force, vel, debug }) => {
    if (this.MOVING.down || force) {
      let newPos = this.position[1] + (vel || this.VEL)
      let canGo = this.game.canGo({
        object: this,
        position: [this.position[0], newPos],
        reason: true
      })

      if (!canGo.status && canGo.reason.height > this.game.HEIGHT) {
        this.position[1] = canGo.available[1]
        this.AIRBORNE = false
      } else if (!canGo.status && canGo.reason instanceof Sprite) {
        this.AIRBORNE = false
      } else {
        this.position[1] = newPos
      }
    }
  }

  this.moveLeft = ({ force, vel, debug }) => {
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
      // this.FACING = -1
    }
  }

  this.moveRight = ({ force, vel, debug }) => {
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
      // this.FACING = 1
    }
  }

  // handle movement
  let draw = this.draw
  this.draw = () => {
    draw.apply(this)

    this.move({ debug })
  }

  this.VEL = vel ? vel : this.VEL
  this.CONTROLS = controls ? controls : this.CONTROLS

  __hookKeys()
}
