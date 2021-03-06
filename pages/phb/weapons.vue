<template lang="pug">
  v-container(:class="{ 'px-0': $vuetify.breakpoint.xsOnly }" )

    // Search functions for large screens
    div.hidden-sm-and-down
      h2.display-1 Weapons
      p Read the #[nuxt-link(to="/phb/rules/equipment#weapons") Weapon Rules] to understand the changes from 5th Edition to Mass Effect 5e.
      v-layout(row wrap)
        v-flex(md4).px-1
          v-text-field(append-icon="search" label="Search" single-line hide-details v-model="search")
        v-flex(md8).px-1
          weapon-filters(:itemKey="itemKey")

    // List
    weapon-list(:items="filtered")

    // Mobile Filters
    mobile-filter-container(title="Filter Weapons")
      template(slot="filters")
        weapon-filters(:itemKey="itemKey")

</template>

<script>
  import WeaponList from '~/components/weapon/WeaponList.vue'
  import WeaponFilters from '~/components/weapon/WeaponFilters.vue'
  import BookmarkButton from '~/components/BookmarkButton.vue'
  import MobileFilterContainer from '~/components/list/MobileFilterContainer.vue'
  import {AverageFromDie} from '~/mixins/averageFromDie'
  import items from '~/static/data/weapons'

  // State
  import {createNamespacedHelpers} from 'vuex'
  const {mapActions, mapGetters} = createNamespacedHelpers('itemList')

  export default {
    components: {
      MobileFilterContainer,
      WeaponFilters,
      WeaponList,
      BookmarkButton
    },
    mixins: [AverageFromDie],
    data () {
      return {
        items,
        itemKey: 'weapons'
      }
    },
    computed: {
      ...mapGetters(['order', 'sortBy', 'filters', 'searchString']),
      search: {
        get () {
          return this.searchString
        },
        set (value) {
          this.updateSearchString(value)
        }
      },
      filtered () {
        let data = this.items
        let sortBy = this.sortBy.key
        let order = this.order
        let self = this
        data.sort(function (a, b) {
          switch (sortBy) {
            case 'type':
            case 'name':
              a = a[sortBy]
              b = b[sortBy]
              break
            case 'damage':
              a = self.averageFromDie(a.damage)
              b = self.averageFromDie(b.damage)
              break
            default:
              a = a[sortBy] ? parseInt(a[sortBy].replace(/\D/, ''), 10) : 0
              b = b[sortBy] ? parseInt(b[sortBy].replace(/\D/, ''), 10) : 0
          }
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
        if (this.search) {
          data = data.filter((item) => {
            let nameMatch = item.name.toLowerCase().indexOf(this.search.toLowerCase()) >= 0
            let typeMatch = item.type.toLowerCase().indexOf(this.search.toLowerCase()) >= 0
            return nameMatch || typeMatch
          })
        }
        for (const key in this.filters[this.itemKey]) {
          const filter = this.filters[this.itemKey][key]
          if (filter.length > 0) {
            data = data.filter(item => filter.includes(item[key]))
          }
        }
        return data
      }
    },
    head () {
      return {
        title: 'Weapons - Equipment | Mass Effect 5e',
        meta: [
          { hid: 'description', name: 'description', content: 'The Mass Effect 5e arsenal has over 80 unique weapons designed to match the game\'s weaponry' }
        ]
      }
    },
    layout: 'phb',
    methods: {
      ...mapActions(['updateSearchString'])
    }
  }
</script>
