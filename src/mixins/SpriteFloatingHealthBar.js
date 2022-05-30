import HealthBar from '../classes/HealthBar.js'

export default function () {
  const healthBar = new HealthBar({ sprite: this, game: this.game })
  let healthBarTimeout = 4

  let __showHealthBar = () => {
    healthBarTimeout = 4
  }

  // draw healthBar
  let draw = this.draw
  this.draw = () => {
    draw.apply(this)

    if (
      this.MOVING.up ||
      this.MOVING.down ||
      this.MOVING.left ||
      this.MOVING.right
    ) {
      __showHealthBar()
    }

    healthBar.draw()
  }

  this.on('attacked', () => {
    __showHealthBar()
  })

  setInterval(() => {
    if (healthBarTimeout > 0) {
      healthBar.show()
    } else {
      healthBar.show(false)
    }

    healthBarTimeout -= 1
  }, 500)
}
