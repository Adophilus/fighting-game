import Sprite from '../classes/Sprite.js'
import SpriteAttack from '../mixins/SpriteAttack.js'
import SpriteColor from '../mixins/SpriteColor.js'
import SpriteHealth from '../mixins/SpriteHealth.js'
import SpriteMovement from '../mixins/SpriteMovement.js'
import SpriteStats from '../mixins/SpriteStats.js'

export default function ({ game, position, controls }) {
  return new Sprite({
    position,
    game,
    mixins: [
      [SpriteHealth],
      [SpriteAttack],
      [SpriteColor, [{ fill: 'black', outline: 'yellow' }]],
      [SpriteStats],
      [
        SpriteMovement,
        [
          {
            controls
          }
        ]
      ]
    ]
  })
}
