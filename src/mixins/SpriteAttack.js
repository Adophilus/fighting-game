const debug = false

export default function (callback) {
  let __hookKeys = () => {
    window.addEventListener('keydown', (event) => {
      if (event.key === this.CONTROLS.attack) {
        // this.ATTACKING = true
        if (this.DEAD || this.END) {
          return
        }

        this.trigger(
          'attack',
          () =>
            this.game.initiateAttack({ initiator: this, atk: this.STATS.ATK })
          // this.game.initiateAttack({ initiator: this, atk: 0 })
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
    if (this.DEAD || this.END) {
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
