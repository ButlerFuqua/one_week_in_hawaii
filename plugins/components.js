import Vue from 'vue'
import TLDR from '~/components/content/TLDR'


const components = { TLDR }

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})