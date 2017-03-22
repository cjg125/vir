export default function (watch) {
  for (let name in watch) {
    this.on(name, watch[name])
  }
}