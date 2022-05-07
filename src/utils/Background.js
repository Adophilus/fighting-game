import Sprite from '../classes/Sprite.js'
import SpriteImage from '../mixins/SpriteImage.js'

export default function ({ game }) {
  game.GROUND = game.HEIGHT - 96

  return new Sprite({
    position: [0, 0],
    game,
    mixins: [[SpriteImage, [{ img: 'assets/background.png' }]]]
  })
}
