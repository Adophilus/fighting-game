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
        position: [0, 0],
        game: this
      }),
      new Sprite({
        position: [300, 0],
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

    this.animate()
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
