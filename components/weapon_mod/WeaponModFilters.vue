<template lang="pug">
  v-container(grid-list-md).pa-0
    v-layout(row justify-center wrap)
      v-flex(xs12 md4)
        v-select(:items="placementOptions" v-model="placementFilter" label="Placement" multiple menu-props="{maxHeight:'400'}")
      v-flex(xs12 md4)
        v-select(:items="weaponTypeOptions" v-model="weaponTypeFilter" label="Weapon Availability" multiple menu-props="{maxHeight:'400'}")
      v-flex(xs12 md4)
        v-select(:items="noteOptions" v-model="noteFilter" label="Benefits" multiple menu-props="{maxHeight:'400'}")
      v-flex(xs12).text-xs-center.hidden-md-and-up
        v-btn(@click="reset()") Reset
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'
  const {mapActions, mapGetters} = createNamespacedHelpers('itemList')

  export default {
    props: {
      itemKey: {
        type: String,
        default: ''
      },
      noteOptions: {
        type: Array,
        default: () => { return [] }
      }
    },
    data () {
      return {
        placementOptions: ['Body', 'Barrel', 'Ammo', 'Magazine'],
        weaponTypeOptions: ['Assault Rifle', 'Heavy Pistol', 'SMG', 'Shotgun', 'Sniper Rifle']
      }
    },
    computed: {
      ...mapGetters(['filters']),
      placementFilter: {
        get () {
          return this.filters[this.itemKey].placement
        },
        set (value) {
          this.updateFilter({key: this.itemKey, filterKey: 'placement', value})
        }
      },
      weaponTypeFilter: {
        get () {
          return this.filters[this.itemKey].weaponType
        },
        set (value) {
          this.updateFilter({key: this.itemKey, filterKey: 'weaponType', value})
        }
      },
      noteFilter: {
        get () {
          return this.filters[this.itemKey].notes
        },
        set (value) {
          this.updateFilter({key: this.itemKey, filterKey: 'notes', value})
        }
      }
    },
    methods: {
      ...mapActions(['updateFilter']),
      reset () {
        this.placementFilter = []
        this.weaponTypeFilter = []
        this.noteFilter = []
      }
    }
  }
</script>

