export default function () {
  this.HEALTH = 100

  let __initHealth = () => {
    this.health = {
      decrease: (amount) => {
        if (this.HEALTH > 0) {
          this.HEALTH = this.HEALTH - amount < 0 ? 0 : this.HEALTH - amount
          this.trigger('health-decrease', amount)
        }
      },
      increase: (amount) => {
        if (this.HEALTH < 100) {
          this.HEALTH = this.HEALTH + amount > 100 ? 100 : this.HEALTH + amount
          this.trigger('health-increase', amount)
        }
      }
    }
  }

  __initHealth()
}
