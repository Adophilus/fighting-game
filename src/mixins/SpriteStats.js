export default function (params = { atk: 1 }) {
  let { atk } = params
  this.STATS = {
    ATK: atk
  }
}
