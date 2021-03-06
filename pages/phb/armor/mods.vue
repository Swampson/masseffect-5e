<template lang="pug">
  v-container(:class="{ 'px-0': $vuetify.breakpoint.xsOnly }" )

    // Search functions for large screens
    div.hidden-sm-and-down
      h2.display-1 Armor Mods
      p Read the #[nuxt-link(to="/phb/rules/equipment#custom-armor") Armor Rules] to understand how armor customization works.
      v-layout(row wrap)
        v-flex(xs4).px-1
          v-text-field(append-icon="search" label="Search" single-line hide-details v-model="search")
        v-flex(xs8).px-1
          armor-mod-filters(:itemKey="itemKey" v-bind:noteOptions="noteOptions")

    // List
    armor-mod-list(:items="filtered")

    // Mobile Filters
    mobile-filter-container(title="Filter Armor Mods")
      template(slot="filters")
        armor-mod-filters(:itemKey="itemKey" v-bind:noteOptions="noteOptions")
</template>

<script>
  import ArmorModFilters from '~/components/armor_mod/ArmorModFilters.vue'
  import ArmorModList from '~/components/armor_mod/ArmorModList.vue'
  import MobileFilterContainer from '~/components/MobileFilterContainer.vue'
  import items from '~/static/data/armor_mods.json'

  // State
  import {createNamespacedHelpers} from 'vuex'
  const {mapActions, mapGetters} = createNamespacedHelpers('itemList')

  export default {
    components: { ArmorModFilters, ArmorModList, MobileFilterContainer },
    data () {
      const noteOptions = new Set()
      for (const item of items) {
        for (const note of item.notes.split(',').map(n => n.trim())) {
          noteOptions.add(note)
        }
      }
      return {
        items,
        noteOptions: [...noteOptions].sort(),
        itemKey: 'armorMods'
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
        data.sort(function (a, b) {
          const aSort = sortBy === 'cost' ? parseInt(a[sortBy], 10) : a[sortBy]
          const bSort = sortBy === 'cost' ? parseInt(b[sortBy], 10) : b[sortBy]
          return (aSort === bSort ? 0 : aSort > bSort ? 1 : -1) * order
        })
        if (this.search) {
          data = data.filter((item) => {
            let nameMatch = item.name.toLowerCase().indexOf(this.searchString.toLowerCase()) >= 0
            let textMatch = item.notes.toLowerCase().indexOf(this.searchString.toLowerCase()) >= 0
            let descMatch = item.description.toLowerCase().indexOf(this.searchString.toLowerCase()) >= 0
            let featMatch = item.feature.toLowerCase().indexOf(this.searchString.toLowerCase()) >= 0
            return nameMatch || textMatch || descMatch || featMatch
          })
        }
        if (this.filters.armorMods.type.length > 0) {
          data = data.filter(item => this.filters.armorMods.type.includes(item.type))
        }
        if (this.filters.armorMods.notes.length > 0) {
          data = data.filter(item => {
            for (const note of item.notes.split(',').map(n => n.trim())) {
              if (this.filters.armorMods.notes.includes(note)) {
                return item
              }
            }
          })
        }
        return data
      }
    },
    head () {
      return {
        title: 'Armor Mods - Equipment | Mass Effect 5e',
        meta: [
          { hid: 'description', name: 'description', content: 'Mass Effect 5e comes with a full set of armor mods that let you customize your armor to your needs.' }
        ]
      }
    },
    layout: 'phb',
    methods: {
      ...mapActions(['updateSearchString'])
    }
  }
</script>
