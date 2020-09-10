class Observer{
  constructor() {
    this.events = {}
  }
  subscribe (id, call) {
    if (!this.events.hasOwnProperty(id)) {
      this.events[id] = []
    }
    if (typeof call === 'function') {
      this.events[id].push(call)
    }
  }
  publish (id, ...args) {
    if (this.events[id]) {
      this.events[id].forEach(item => {
        item.apply(null, args)
      })
    }
  }
}

const observer = new Observer() 

export default observer