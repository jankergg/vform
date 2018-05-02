export default {
  created () {
    this.uuid = Math.random().toString(36).substr(3, 8)
  }
}
