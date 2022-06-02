export default function ({ container }) {
  let healthElement = container.querySelector('.health')
  let healthAnimationElement = container.querySelector('.health-anim')

  this.on('health-decrease', (amt) => {
    healthElement.style.width = `${this.HEALTH}%`
    setInterval(() => {
      if (healthAnimationElement.style.width === healthElement.style.width) {
        return
      }

      let newWidth = Number(healthAnimationElement.style.width.replace('%', ''))
      newWidth--

      healthAnimationElement.style.width = `${newWidth}%`
    }, 100)
  })

  healthElement.style.width = `${this.HEALTH}%`
  healthAnimationElement.style.width = `${this.HEALTH}%`
}
