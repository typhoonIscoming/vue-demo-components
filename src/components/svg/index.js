import Vue from 'vue'
import SvgIcon from './svgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('../../assets/svgsOutput', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
