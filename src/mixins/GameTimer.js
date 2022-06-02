export default function ({ time, element }) {
  element.innerText = time
  let timer

  this.on('start', () => {
    timer = setInterval(() => {
      if (time === 0) {
        this.trigger('end')
      }

      element.innerText = time--
    }, 1000)
  })

  this.on('end', () => clearInterval(timer))
}
