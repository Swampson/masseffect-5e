import Vuex from 'vuex'

import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

// modules
import phb from './phb_pages'
import classPage from './class_page'
import itemList from './itemList'
import gruntGenerator from './grunt_generator'

const createStore = () => {
  return new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules: {
      phb,
      classPage,
      itemList,
      gruntGenerator
    }
  })
}

export default createStore
