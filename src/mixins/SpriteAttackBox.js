import AttackBox from '../classes/AttackBox.js'

export default function ({ width, height }) {
  this.on('attack', () => {
    this.attackBox.draw()
  })

  this.attackBox = new AttackBox({
    sprite: this,
    game: this.game,
    width,
    height
  })
}
