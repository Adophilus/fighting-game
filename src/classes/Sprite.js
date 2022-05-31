import AttackBox from './AttackBox.js'
import HealthBar from './HealthBar.js'

class Sprite {
  WIDTH = 25
  HEIGHT = 50
  CONTROLS = {}
  DEAD = false

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

  draw() {}

  on(eventName, handler) {
    if (!this._eventHandlers) this._eventHandlers = {}
    if (!this._eventHandlers[eventName]) this._eventHandlers[eventName] = []
    this._eventHandlers[eventName].push(handler)
    return this
  }

  off(eventName, handler) {
    let handlers = this._eventHandlers?.[eventName]
    if (!handlers) return
    for (let i = 0; i < handlers.length; i++)
      if (handlers[i] === handler) handlers.splice(i--, 1)
  }

  trigger(eventName, ...args) {
    if (!this._eventHandlers?.[eventName]) return
    this._eventHandlers[eventName].forEach((handler) =>
      handler.apply(this, args)
    )
  }
}

export default Sprite
