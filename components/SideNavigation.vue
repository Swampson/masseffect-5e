<template lang="pug">
  v-navigation-drawer(fixed clipped app v-model="isActive")
    v-list(dense)
      template(v-for="item in items")
        v-list-group(v-if="item.items" v-bind:prepend-icon="item.icon" no-action)
          v-list-tile(slot="activator" ripple)
            v-list-tile-content
              v-list-tile-title {{ item.title }}
          template(v-for="(subItem, i) in item.items")
            v-list-tile(:key="i" v-bind="{to: subItem.href, href: subItem.href }" ripple nuxt)
              v-list-tile-content
                v-list-tile-title {{ subItem.title }}
        v-subheader(v-else-if="item.header") {{ item.header }}
        v-divider(v-else-if="item.divider")
        v-list-tile(v-else v-bind="{ to: item.href, href: item.href }" ripple rel="noopener" nuxt)
          v-list-tile-action(v-if="item.icon")
            v-icon {{ item.icon }}
          v-list-tile-content
            v-list-tile-title {{ item.title }}
          v-list-tile-avatar(v-if="item.icon === 'book'" color="primary" size="20").white--text {{ bookmarkCount }}
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['bookmarkCount', 'getVersion']),
      isActive: {
        get () {
          return this.$store.state.sidebar
        },
        set (val) {
          this.$store.commit('toggleSidebar', val)
        }
      }
    },
    data () {
      return {
        items: [
          {
            header: 'Player\'s Handbook'
          },
          {
            title: 'Introduction',
            icon: 'code',
            href: '/phb/intro'
          },
          {
            title: 'Rules',
            icon: 'gavel',
            items: [
              { href: '/phb/rules/general', title: 'General' },
              { href: '/phb/rules/combat', title: 'Combat' },
              { href: '/phb/rules/spellcasting', title: 'Spellcasting' },
              { href: '/phb/rules/weapons', title: 'Weapons' },
              { href: '/phb/rules/armor', title: 'Armor' },
              { href: '/phb/rules/expenses', title: 'Expenses' },
              { href: '/phb/rules/multiclassing', title: 'Multiclassing' },
              { href: '/phb/rules/skills', title: 'Skills' },
              { href: '/phb/rules/conditions', title: 'Conditions' }
            ]
          },
          {
            title: 'Player Options',
            icon: 'face',
            items: [
              { href: '/phb/classes', title: 'Classes' },
              { href: '/phb/races', title: 'Races' },
              { href: '/phb/feats', title: 'Feats' },
              { href: '/phb/backgrounds', title: 'Backgrounds' }
            ]
          },
          {
            title: 'Equipment',
            icon: 'build',
            items: [
              { href: '/phb/weapons', title: 'Weapons' },
              { href: '/phb/weapon-mods', title: 'Weapon Mods' },
              { href: '/phb/armor/mods', title: 'Armor Mods' },
              { href: '/phb/armor/sets', title: 'Armor Sets' },
              { href: '/phb/items', title: 'Other Items' }
            ]
          },
          {
            title: 'Spells & Powers',
            icon: 'whatshot',
            href: '/phb/spells'
          },
          {
            title: 'Bestiary',
            icon: 'pets',
            href: '/phb/bestiary'
          },
          {
            title: 'Bookmarks',
            icon: 'book',
            href: '/phb/bookmarks'
          },
          {
            title: 'divider',
            divider: true
          },
          {
            header: 'Tools'
          },
          {
            title: 'For GMs',
            icon: 'extension',
            items: [
              {href: '/for-gms/loot-generator', title: 'Loot Generator'},
              {href: '/for-gms/grunts', title: 'Grunt Generator'},
              {href: '/for-gms/armor-creation', title: 'Creating Armor'},
              {href: '/for-gms/encounter-builder', title: 'Encounter Builder'}
            ]
          },
          {
            title: 'divider',
            divider: true
          },
          {
            header: 'Mass Effect 5e'
          },
          { title: 'Get Involved', href: '/contributing' },
          { title: 'About the Project', href: '/about' },
          { title: `Changelog`, href: '/changelog' },
          { title: `Offline / PDF version`, href: '/print/pdf' }
        ]
      }
    }
  }
</script>