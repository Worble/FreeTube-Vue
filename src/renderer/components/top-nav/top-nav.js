import Vue from 'vue'
import FtInput from '../ft-input/ft-input.vue'
import FtSearchFilters from '../ft-search-filters/ft-search-filters.vue'
import $ from 'jquery'
import router from '../../router/index.js'
import debounce from 'lodash.debounce'
import ytSuggest from 'youtube-suggest'

export default Vue.extend({
  name: 'TopNav',
  components: {
    FtInput,
    FtSearchFilters,
  },
  data: () => {
    return {
      component: this,
      windowWidth: 0,
      showFilters: false,
      searchSuggestionsDataList: [],
      searchContainerHidden: false,
    }
  },
  computed: {
    enableSearchSuggestions: function () {
      return this.$store.getters.getEnableSearchSuggestions
    },

    searchSettings: function () {
      return this.$store.getters.getSearchSettings
    },

    isSideNavOpen: function () {
      return this.$store.getters.getIsSideNavOpen
    },

    barColor: function () {
      return this.$store.getters.getBarColor
    },

    invidiousInstance: function () {
      return this.$store.getters.getInvidiousInstance
    },

    backendFallback: function () {
      return this.$store.getters.getBackendFallback
    },

    backendPreference: function () {
      return this.$store.getters.getBackendPreference
    },
  },
  mounted: function () {
    const appWidth = $(window).width()

    if (appWidth <= 680) {
      //const searchContainer = $('.searchContainer').get(0)
      //searchContainer.style.display = 'none'
      this.searchContainerHidden = true
    }

    window.addEventListener('resize', (event) => {
      const width = event.srcElement.innerWidth
      //const searchContainer = $('.searchContainer').get(0)

      if (width > 680) {
        //searchContainer.style.display = ''
        this.searchContainerHidden = false
      } else {
        //searchContainer.style.display = 'none'
        this.searchContainerHidden = true
      }
    })

    this.debounceSearchResults = debounce(this.getSearchSuggestions, 500)
  },
  methods: {
    goToSearch: function (query) {
      const appWidth = $(window).width()

      if (appWidth <= 680) {
        //const searchContainer = $('.searchContainer').get(0)
        //searchContainer.blur()
        //searchContainer.style.display = 'none'
        this.searchContainerHidden = true
      }

      this.$store.dispatch('getVideoIdFromUrl', query).then((result) => {
        if (result) {
          this.$router.push({
            path: `/watch/${result}`,
          })
        } else {
          router.push({
            path: `/search/${encodeURIComponent(query)}`,
            query: {
              sortBy: this.searchSettings.sortBy,
              time: this.searchSettings.time,
              type: this.searchSettings.type,
              duration: this.searchSettings.duration,
            },
          })
        }
      })

      this.showFilters = false
    },

    getSearchSuggestionsDebounce: function (query) {
      if (this.enableSearchSuggestions) {
        this.debounceSearchResults(query)
      }
    },

    getSearchSuggestions: function (query) {
      switch (this.backendPreference) {
        case 'local':
          this.getSearchSuggestionsLocal(query)
          break
        case 'invidious':
          this.getSearchSuggestionsInvidious(query)
          break
      }
    },

    getSearchSuggestionsLocal: function (query) {
      if (query === '') {
        this.searchSuggestionsDataList = []
        return
      }

      ytSuggest(query).then((results) => {
        this.searchSuggestionsDataList = results
      })
    },

    getSearchSuggestionsInvidious: function (query) {
      if (query === '') {
        this.searchSuggestionsDataList = []
        return
      }

      const searchPayload = {
        resource: 'search/suggestions',
        id: '',
        params: {
          q: query,
        },
      }

      this.$store
        .dispatch('invidiousAPICall', searchPayload)
        .then((results) => {
          this.searchSuggestionsDataList = results.suggestions
        })
        .error((err) => {
          console.log(err)
          if (this.backendFallback) {
            console.log(
              'Error gettings search suggestions.  Falling back to Local API'
            )
            this.getSearchSuggestionsLocal(query)
          }
        })
    },

    toggleSearchContainer: function () {
      // const searchContainer = $('.searchContainer').get(0)

      // if (searchContainer.style.display === 'none') {
      //   searchContainer.style.display = ''
      // } else {
      //   searchContainer.style.display = 'none'
      // }
      this.searchContainerHidden = !this.searchContainerHidden

      this.showFilters = false
    },

    historyBack: function () {
      window.history.back()
    },

    historyForward: function () {
      window.history.forward()
    },

    toggleSideNav: function () {
      this.$store.commit('toggleSideNav')
    },
  },
})
