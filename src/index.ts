import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class App extends Vue {
  public info = 'weex'

  constructor () {
    super()
  }
}