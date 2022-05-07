import AttackBox from './AttackBox.js'
import HealthBar from './HealthBar.js'

class Sprite {
  WIDTH = 25
  HEIGHT = 50
  FIRST_DRAW = true
  CONTROLS = {}

  constructor({ game, position = [0, 0], mixins = [] }) {
    this.game = game
    this.position = position

    this.__assignId()

    for (let mixin of mixins) {
      mixin[0].apply(this, mixin[1])
    }
  }

  __assignId() {
    this.id = ++this.game.constructor.OBJECTS_COUNT
  }

  equals(obj) {
    return this.id === obj.id
  }

  // handle animation and collisions
  draw() {}
}

export default Sprite
