const debug = false

export default function (callback) {
  let __hookKeys = () => {
    window.addEventListener('keydown', (event) => {
      if (event.key === this.CONTROLS.attack) {
        // this.ATTACKING = true
        this.trigger('attack', () =>
          this.game.initiateAttack({ initiator: this, atk: this.STATS.ATK })
        )
      }
    })

    // window.addEventListener('keyup', (event) => {
    //   if (event.key === this.CONTROLS.attack) {
    //     // this.ATTACKING = false
    //     // this.trigger("attack-end")
    //   }
    // })
  }

  this.receiveAttack = (atk) => {
    if (this.DEAD) {
      return
    }

    this.trigger('attacked', atk)
    this.health.decrease(atk)

    if (this.HEALTH <= 0) {
      this.DEAD = true
      this.trigger('death')
    }
  }

  __hookKeys()
}
