import Sprite from './Sprite.js'
import Fighter from '../utils/Fighter.js'
import Background from '../utils/Background.js'
import Shop from '../utils/Shop.js'

class Game {
  static OBJECTS_COUNT = 0

  WIDTH = 900 // 1024
  HEIGHT = 576
  GROUND = this.HEIGHT
  PLAYERS = []
  ENEMIES = []
  OBJECTS = []
  NPCS = []
  GRAVITY = 9.8
  FRAME = {
    ELAPSED: 0
  }

  constructor() {
    this.canvas = document.querySelector('#game')
    this.context = this.canvas.getContext('2d')
  }

  init() {
    this.canvas.width = this.WIDTH
    this.canvas.height = this.HEIGHT
    this.draw()
  }

  start() {
    this.GROUND = this.HEIGHT - 96

    this.NPCS = [new Background({ game: this }), new Shop({ game: this })]

    this.PLAYERS = [
      new Fighter({
        game: this,
        position: [100, 0],
        controls: {
          up: 'ArrowUp',
          down: 'ArrowDown',
          left: 'ArrowLeft',
          right: 'ArrowRight',
          attack: 'Insert'
        }
      }),
      new Fighter({
        game: this,
        position: [300, 0],
        controls: {
          up: 'w',
          down: 's',
          left: 'a',
          right: 'd',
          attack: 'f'
        }
      })
    ]

    this.animate()
  }

  canGo({ object, position, debug, reason, exclude }) {
    let objects = new Array(...this.OBJECTS, ...this.ENEMIES, ...this.PLAYERS)

    for (let o of objects) {
      if (o.equals(object)) {
        continue
      }
      if (exclude) {
        if (exclude.find((_o) => o.equals(_o))) {
          continue
        }
      }

      if (
        position[0] + object.WIDTH >= o.position[0] &&
        position[0] <= o.position[0] + o.WIDTH &&
        position[1] + object.HEIGHT >= o.position[1] &&
        position[1] <= o.position[1] + o.HEIGHT
      ) {
        if (reason) {
          return { status: false, reason: o }
        }
        return false
      }
    }

    if (position[0] < 0) {
      if (reason) {
        return {
          status: false,
          available: [0, object.position[1]],
          reason: { width: -1 }
        }
      }
      return false
    } else if (position[0] + object.WIDTH > this.WIDTH) {
      if (reason) {
        return {
          status: false,
          available: [this.WIDTH - object.WIDTH, object.position[1]],
          reason: { width: this.WIDTH + 1 }
        }
      }
      return false
    }

    if (position[1] < 0) {
      if (reason) {
        return {
          status: false,
          available: [object.position[0], 0],
          reason: { height: -1 }
        }
      }
      return false
    } else if (position[1] + object.HEIGHT > this.GROUND) {
      if (reason) {
        return {
          status: false,
          available: [object.position[0], this.GROUND - object.HEIGHT],
          reason: { height: this.HEIGHT + 1 }
        }
      }
      return false
    }

    if (reason) {
      return {
        status: true
      }
    }
    return true
  }

  initiateAttack({ initiator, atk }) {
    let objects = new Array(...this.OBJECTS, ...this.ENEMIES, ...this.PLAYERS)

    for (let o of objects) {
      if (initiator.equals(o)) {
        continue
      }

      let canStayInPosition = this.canGo({
        object: initiator.attackBox,
        position: initiator.attackBox.position,
        reason: true,
        exclude: [initiator]
      })
      if (
        !canStayInPosition.status &&
        canStayInPosition.reason instanceof Sprite
      ) {
        canStayInPosition.reason.receiveAttack(atk)
      }
    }
  }

  draw() {
    this.context.fillStyle = 'black'
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  animate() {
    this.draw()

    this.NPCS.forEach((o) => {
      o.draw()
    })

    this.OBJECTS.forEach((o, i) => {
      if (!o.HEALTH) {
        this.OBJECTS.splice(i, 1)
        return
      }

      // handle gravity
      o.moveDown({ force: true, vel: this.GRAVITY })

      o.draw()
    })

    this.ENEMIES.forEach((o, i) => {
      if (!o.HEALTH) {
        this.ENEMIES.splice(i, 1)
        return
      }

      // handle gravity
      o.moveDown({ force: true, vel: this.GRAVITY })

      o.draw()
    })

    this.PLAYERS.forEach((o, i) => {
      if (!o.HEALTH) {
        this.PLAYERS.splice(i, 1)
        return
      }

      // handle gravity
      o.moveDown({ force: true, vel: this.GRAVITY })

      o.draw()
    })

    this.FRAME.ELAPSED++

    window.requestAnimationFrame(() => this.animate())
  }
}

export default Game
