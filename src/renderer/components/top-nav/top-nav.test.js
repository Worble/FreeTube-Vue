import { mount, createLocalVue } from '@vue/test-utils'
import TopNav from './top-nav.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

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
      getSearchSettings: jest.fn((x) => {
        return {
          sortBy: '',
          time: '',
          type: '',
          duration: ''
        }
      }),
      getIsSideNavOpen: jest.fn(),
      getBarColor: jest.fn(),
      getInvidiousInstance: jest.fn(),
      getBackendFallback: jest.fn(),
      getBackendPreference: jest.fn()
    }

    actions = {
      getVideoIdFromUrl: jest.fn(async (x) => null)
    }

    store = new Vuex.Store({
      actions,
      getters
    })
  })

  // Inspect the raw component options
  it('has a created hook', async () => {
    const wrapper = mount(TopNav, {
      localVue,
      router,
      store
    })

    const input = wrapper.get('.ft-input')
    input.element.value = 'input'
    await input.trigger('input')
    const button = wrapper.get('.inputAction')
    await button.trigger('click')

    expect(actions.getVideoIdFromUrl).toHaveBeenCalled()
    expect(wrapper.vm.$route.path).toBe('/search/input')
  })
})
