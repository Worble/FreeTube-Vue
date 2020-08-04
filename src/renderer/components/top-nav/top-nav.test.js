import {
  mount,
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
import router from '../../router'

library.add(fas)
const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)
localVue.component('font-awesome-icon', FontAwesomeIcon)

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
          duration: '',
        }
      }),
      getIsSideNavOpen: jest.fn(),
      getBarColor: jest.fn(),
      getInvidiousInstance: jest.fn(),
      getBackendFallback: jest.fn(),
      getBackendPreference: jest.fn(),
    }

    actions = {
      getVideoIdFromUrl: jest.fn(async (x) => null),
    }

    store = new Vuex.Store({
      actions,
      getters,
    })
  })

  it('routes to search', async () => {
    //arrange
    const wrapper = mount(TopNav, {
      localVue,
      router,
      store,
    })
    const input = wrapper.get('.ft-input')
    const button = wrapper.get('.inputAction')

    //act
    input.element.value = 'test'
    await input.trigger('input')
    await button.trigger('click')

    //assert
    expect(wrapper.vm.$route.path).toBe('/search/test')
  })

  it('routes to search and encodes the url', async () => {
    //arrange
    const wrapper = mount(TopNav, {
      localVue,
      router,
      store,
    })
    const input = wrapper.get('.ft-input')
    const button = wrapper.get('.inputAction')

    //act
    input.element.value = 'test/search'
    await input.trigger('input')
    await button.trigger('click')

    //assert
    expect(wrapper.vm.$route.path).toBe('/search/test%2Fsearch')
  })
})
