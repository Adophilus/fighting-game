import Sprite from './Sprite.js'

class Fighter extends Sprite {
  CONTROLS = {
    up: 'w',
    down: 's',
    left: 'a',
    right: 'd',
    attack: 'f'
  }
}

export default Fighter
