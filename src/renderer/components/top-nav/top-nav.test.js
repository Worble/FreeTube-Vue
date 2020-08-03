import {
  mount,
  shallowMount,
  createLocalVue
} from '@vue/test-utils'
import TopNav from './top-nav.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'
import {
  library
} from '@fortawesome/fontawesome-svg-core'
import {
  fas
} from '@fortawesome/free-solid-svg-icons'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)
library.add(fas)
localVue.component('font-awesome-icon', FontAwesomeIcon)


const router = new VueRouter()

describe('TopNav', () => {
  let actions
  let getters
  let store

  beforeEach(() => {
    getters = {
      getEnableSearchSuggestions: jest.fn(),
      getSearchSettings: jest.fn(),
      getIsSideNavOpen: jest.fn(),
      getBarColor: jest.fn(),
      getInvidiousInstance: jest.fn(),
      getBackendFallback: jest.fn(),
      getBackendPreference: jest.fn(),
    }

    actions = {
      getVideoIdFromUrl: jest.fn(),
    }

    store = new Vuex.Store({
      actions,
      getters,
    })
  })

  // Inspect the raw component options
  it('has a created hook', async () => {
    const wrapper = mount(TopNav, {
      localVue,
      router,
      store
    })

    const input = wrapper.get('.searchInput')
    input.element.value = 'input'
    await input.trigger('input')
    await input.trigger('click')

    expect(actions.getVideoIdFromUrl).toHaveBeenCalled()
  })
})
