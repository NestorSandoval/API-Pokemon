<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  pokemonId: number
  showPokemon?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showPokemon: false,
})

const pokemonsImage = computed(
  () =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.pokemonId}.svg`
)
</script>
<template>
  <section>
    <img
      v-if="!showPokemon"
      class="brightness-0 h-[200px] fade-in"
      alt="PokemonImage"
      :src="pokemonsImage"
    />
    <img
      v-else
      class="h-[200px] fade-in"
      alt="PokemonImage"
      :src="pokemonsImage"
    />
  </section>
</template>

<style scoped>
img {
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
}
</style>
