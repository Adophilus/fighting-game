export default function () {
  const __setFacing = () => {
    for (let player of this.game.PLAYERS) {
      if (player.equals(this)) {
        continue
      }

      if (player.position[0] + player.WIDTH / 2 < this.position[0]) {
        this.FACING = -1
      } else {
        this.FACING = 1
      }
    }
  }

  // handle drawing
  let draw = this.draw
  this.draw = () => {
    draw.apply(this)

    __setFacing()
  }

  __setFacing()
}
