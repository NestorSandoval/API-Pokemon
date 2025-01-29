<template>
  <section
    v-if="isLoading || randomPokemon.id === null"
    class="flex flex-col justify-center items-center"
  >
    <h1 class="text-3xl text-black">Espere por favor</h1>
    <h3 class="animate-pulse text-black">Cargando Pokémons</h3>
  </section>

  <section v-else class="flex flex-col justify-center items-center">
    <h1 class="m-10 text-black text-3xl font-mono">¿Quién es este Pokémon?</h1>

    <div class="h-20">
      <button
        v-if="gameStatus !== GameStatus.Playing"
        @click="getNextRound(4)"
        class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition-all"
      >
        ¿Jugar de nuevo?
      </button>
    </div>

    <PokemonPicture
      :pokemon-id="randomPokemon.id"
      :show-pokemon="gameStatus !== GameStatus.Playing"
    />

    <PokemonOptions
      :options="options"
      :block-selection="gameStatus !== GameStatus.Playing"
      :correct-answer="randomPokemon.id"
      @selected-option="checkAnswer"
    />
  </section>
</template>

<script setup lang="ts">
import { usePokemonGame } from 'src/composables/usePokemonGame'
import { GameStatus } from '@interfaces/game-status.enum'
import PokemonPicture from './PokemonPicture.vue'
import PokemonOptions from './PokemonOptions.vue'

const {
  randomPokemon,
  isLoading,
  gameStatus,
  pokemonsOptions: options,
  checkAnswer,
  getNextRound,
} = usePokemonGame()
</script>
