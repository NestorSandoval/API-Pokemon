import { computed, onMounted, ref } from 'vue'

import confetti from 'canvas-confetti'
import { pokemonApi } from 'src/api/pokemonApi'
import {
  GameStatus,
  type Pokemon,
  type PokemonListResponse,
} from '@interfaces/index'

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.Playing)
  const pokemons = ref<Pokemon[]>([])
  const pokemonsOptions = ref<Pokemon[]>([])

  const randomPokemon = computed(() => {
    const randomIndex = Math.floor(Math.random() * pokemonsOptions.value.length)
    return pokemonsOptions.value[randomIndex]
  })

  const isLoading = computed(() => pokemons.value.length === 0)

  const getPokemons = async (): Promise<Pokemon[]> => {
    const response = await pokemonApi.get<PokemonListResponse>('/?limit=151')
    const pokemonsArray = response.data.results.map((pokemon) => {
      const urlParts = pokemon.url.split('/')

      const id = urlParts[urlParts.length - 2]

      return {
        name: pokemon.name,
        id: +id,
      }
    })

    return pokemonsArray.sort(() => Math.random() - 0.5)
  }

  const getNextRound = (howMany: number = 4) => {
    gameStatus.value = GameStatus.Playing
    pokemonsOptions.value = pokemons.value.slice(0, howMany)
    pokemons.value = pokemons.value.slice(howMany)
  }

  const checkAnswer = (id: number) => {
    const hasWon = randomPokemon.value.id === id

    if (hasWon) {
      gameStatus.value = GameStatus.Won
      confetti({
        particleCount: 1000,
        spread: 300,
        origin: { y: 0.6 },
      })
      return
    }
    gameStatus.value = GameStatus.Lost
  }

  onMounted(async () => {
    pokemons.value = await getPokemons()
    getNextRound()

    console.log(pokemonsOptions.value)
  })

  return {
    gameStatus,
    isLoading,
    pokemonsOptions,
    randomPokemon,
    getNextRound,
    checkAnswer,
  }
}
