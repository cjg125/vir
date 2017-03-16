export default function (watch) {
  for (let name in watch) {
    this.on('change:' + name, watch[name])
  }
}