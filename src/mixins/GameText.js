export default function ({ element }) {
  element.style.opacity = '0'

  this.on('end', () => {
    if (this.PLAYERS[0].isDead()) {
      element.innerText = 'PLAYER 2 WINS'
    } else if (this.PLAYERS[1].isDead()) {
      element.innerText = 'PLAYER 1 WINS'
    } else {
      element.innerText = 'GAME OVER'
    }

    element.style.opacity = '1'
  })
}
