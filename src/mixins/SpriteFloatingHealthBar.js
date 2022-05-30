import HealthBar from '../classes/HealthBar.js'

export default function () {
  this.healthBar = new HealthBar({ sprite: this, game: this.game })

  this.__showHealthBar = () => {
    this.healthBar.SHOW = true
    setTimeout(() => {
      if (this.healthBar.SHOW) {
        this.healthBar.SHOW = false
      }
    }, 4000)
  }

  // draw healthBar
  let draw = this.draw
  this.draw = () => {
    draw.apply(this)

    this.healthBar.draw()
  }
}
