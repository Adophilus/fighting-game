import AttackBox from './AttackBox.js'
import HealthBar from './HealthBar.js'

class Sprite {
  WIDTH = 25
  HEIGHT = 50
  FIRST_DRAW = true
  CONTROLS = {}

  constructor({ game, position = [0, 0], dimensions = [], mixins = [] }) {
    this.WIDTH = dimensions[0] ? dimensions[0] : this.WIDTH
    this.HEIGHT = dimensions[1] ? dimensions[1] : this.HEIGHT
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
