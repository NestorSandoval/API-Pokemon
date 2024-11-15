import type { FavoritePokemon } from '@interfaces/favorite-pokemon'
import { For, createSignal } from 'solid-js'
import { FavoritePokemonCard } from './FavoritePokemonCard'

const getLocalStoragePokemon = (): FavoritePokemon[] => {
  const favortePokemons = JSON.parse(localStorage.getItem('favorites') ?? '[]')

  return favortePokemons
}

export const FavoritePokemons = () => {
  const [pokemons, setPokemons] = createSignal(getLocalStoragePokemon())

  return (
    <div class="grid grid-cols-2 sm:grid-cols-4">
      <For each={pokemons()}>
        {(pokemon) => <FavoritePokemonCard pokemon={pokemon} />}
      </For>
    </div>
  )
}
