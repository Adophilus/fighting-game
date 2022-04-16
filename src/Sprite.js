import AttackBox from './AttackBox.js'

class Sprite {
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

  constructor({ game, position, vel, controls }) {
    this.game = game
    this.position = position
    this.VEL = vel ? vel : this.VEL
    this.CONTROLS = controls ? controls : this.CONTROLS
    this.attackBox = new AttackBox({ sprite: this, game })

    this.hookKeys()
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
  move() {
    this.moveUp()
    this.moveDown()
    this.moveLeft()
    this.moveRight()
  }

  moveUp(force = false) {
    if (this.JUMPING > 0) {
      this.position[1] -= 30
      this.JUMPING -= 30
    } else {
      this.JUMPING = 0
    }

    if (this.MOVING.up || force) {
      if (!this.AIRBORNE) {
        this.JUMPING = 300
      }
    }
  }

  moveDown(force = false) {}

  moveLeft(force = false) {
    if (this.MOVING.left || force) {
      if (this.position[0] - this.VEL >= 0) {
        this.position[0] -= this.VEL
      }
      this.FACING = -1
    }
  }

  moveRight(force = false) {
    if (this.MOVING.right || force) {
      if (this.position[0] + this.VEL + this.WIDTH <= this.game.WIDTH) {
        this.position[0] += this.VEL
      }
      this.FACING = 1
    }
  }

  // handle attack
  attack(force = false) {
    if (this.ATTACKING || force) {
      this.attackBox.draw()
    }
  }

  // handle animation and collisions
  draw() {
    // handle movement
    this.move()

    // handle attack
    this.attack()

    this.game.context.fillStyle = 'red'
    this.game.context.fillRect(...this.position, this.WIDTH, this.HEIGHT)

    // handle gravity
    if (this.position[1] + this.HEIGHT < this.game.HEIGHT) {
      let newPos = this.position[1] + this.GRAVITY

      if (newPos < this.game.HEIGHT - this.HEIGHT) {
        this.position[1] = newPos
      } else {
        this.position[1] = this.game.HEIGHT - this.HEIGHT
      }

      this.AIRBORNE = true
    } else {
      this.AIRBORNE = false
    }
  }
}

export default Sprite
