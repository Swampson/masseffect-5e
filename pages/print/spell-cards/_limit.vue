<template lang="pug">
  div
    spell-card(v-for="spell in items" v-bind:spell="spell" v-bind:key="spell.id")
</template>

<script>
  import SpellCard from '~/components/cards/SpellCard.vue'
  import spells from '~/static/data/spells.json'

  export default {
    name: 'PrintSpellCards',
    components: {
      SpellCard
    },
    data () {
      let items = spells
      const limit = this.$route.params.limit
      if (limit) {
        items = items.filter(spell => spell.availableClasses.includes(limit))
      }
      return {
        items
      }
    },
    head () {
      return {
        title: `Spell Cards${this.limit ? ` - ${this.limit}` : ''} | Mass Effect 5e`,
        meta: [
          { hid: 'description', name: 'description', content: 'Printable Spell Cards for Mass Effect 5e' }
        ]
      }
    },
    layout: 'print'
  }
</script>

