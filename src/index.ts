import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class App extends Vue {
  info = 'weex'

  constructor () {
    super()
  }
}