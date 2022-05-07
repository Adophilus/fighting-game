import HealthBar from '../classes/HealthBar.js'

export default function () {
  this.HEALTH = 100

  let __initHealth = () => {
    this.health = {
      decrease: (amount) => {
        if (this.HEALTH > 0) {
          this.HEALTH -= amount
        }
      },
      increase: (amount) => {
        if (this.HEALTH < 100) {
          this.HEALTH = this.HEALTH + amount > 100 ? 100 : this.HEALTH + amount
        }
      }
    }
  }

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

    if (this.FIRST_DRAW) {
      this.FIRST_DRAW = false
      this.__showHealthBar()
    }

    this.healthBar.draw()
  }

  this.healthBar = new HealthBar({ sprite: this, game: this.game })
  __initHealth()
}
