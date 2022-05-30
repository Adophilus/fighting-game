const debug = false

export default function () {
  // handle attack
  this.attack = (params = {}) => {
    let { force } = params
    if (this.ATTACKING || force) {
      this.game.initiateAttack({ initiator: this, atk: this.STATS.ATK })
      this.trigger('attack')
    }
  }

  let __hookKeys = () => {
    window.addEventListener('keydown', (event) => {
      if (event.key === this.CONTROLS.attack) {
        this.ATTACKING = true
      }
    })

    window.addEventListener('keyup', (event) => {
      if (event.key === this.CONTROLS.attack) {
        this.ATTACKING = false
      }
    })
  }

  this.receiveAttack = (atk) => {
    this.__showHealthBar()
    this.health.decrease(atk)
    this.trigger('attacked', atk)
  }

  // handle movement
  let draw = this.draw
  this.draw = () => {
    draw.apply(this)

    // handle attack
    this.attack({ debug })
  }

  __hookKeys()
}
