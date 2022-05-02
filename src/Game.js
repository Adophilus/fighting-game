import Sprite from './Sprite.js'

class Game {
  WIDTH = 500 // 1024
  HEIGHT = 500 // 576
  PLAYERS = []
  ENEMIES = []
  OBJECTS = []

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
    this.PLAYERS = [
      new Sprite({
        position: [100, 0],
        game: this
      }),
      new Sprite({
        position: [100, 300],
        game: this,
        controls: {
          up: 'ArrowUp',
          down: 'ArrowDown',
          left: 'ArrowLeft',
          right: 'ArrowRight',
          attack: 'Insert'
        }
      })
    ]
    this.PLAYERS[0].DEBUG = true

    window.playerHealthBar = this.PLAYERS[0].healthBar
    this.animate()
  }

  canGo({ object, position, debug, reason }) {
    let objects = new Array(...this.OBJECTS, ...this.ENEMIES, ...this.PLAYERS)

    for (let o of objects) {
      if (object.equals(o)) {
        continue
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
          reason: { width: -1 }
        }
      }
      return false
    } else if (position[0] + object.WIDTH > this.WIDTH) {
      if (reason) {
        return {
          status: false,
          reason: { width: this.WIDTH + 1 }
        }
      }
      return false
    }

    if (position[1] < 0) {
      if (reason) {
        return {
          status: false,
          reason: { height: -1 }
        }
      }
      return false
    } else if (position[1] + object.HEIGHT > this.HEIGHT) {
      if (reason) {
        return {
          status: false,
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

  draw() {
    this.context.fillStyle = 'black'
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  animate() {
    this.draw()

    new Array(...this.OBJECTS, ...this.ENEMIES, ...this.PLAYERS).forEach((o) =>
      o.draw()
    )

    window.requestAnimationFrame(() => this.animate())
  }
}

export default Game
