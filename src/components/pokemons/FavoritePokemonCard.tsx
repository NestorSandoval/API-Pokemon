import type { FavoritePokemon } from '@interfaces/favorite-pokemon'
import { createSignal, Show, type Component } from 'solid-js'

interface Props {
  pokemon: FavoritePokemon
}

export const FavoritePokemonCard: Component<Props> = ({ pokemon }) => {
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-emerald-500',
    'bg-slate-500',
    'bg-cyan-500',
    'bg-indigo-500',
    'bg-violet-500',
    'bg-pink-500',
    'bg-rose-500',
    'bg-violet-500',
  ]

  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  const [isVisible, setIsVisible] = createSignal(true)
  const imageSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`

  const deleteFavorite = () => {
    const favorites = JSON.parse(
      localStorage.getItem('favorites') ?? '[]'
    ) as FavoritePokemon[]

    const newFavorite = favorites.filter((p) => p.id === pokemon.id)

    localStorage.setItem('favorites', JSON.stringify(newFavorite))
    setIsVisible(false)
  }

  return (
    <Show when={isVisible()}>
      <div class={`flex flex-col justify-center items-center mt-5`}>
        <a href={`/pokemons/${pokemon.name}`}>
          <div
            class={`flex flex-col items-center text-white rounded-lg ${randomColor}`}
          >
            <img
              src={imageSrc}
              alt={pokemon.name}
              width="150"
              height="150"
              style={`view-transition-name: ${pokemon.name}-image`}
            />
            <p class="capitalize">
              # {pokemon.id} {pokemon.name}
            </p>
          </div>
        </a>

        <button
          onClick={deleteFavorite}
          class="text-white bg-black hover:bg-red-700 px-12 py-[2px] mt-2 rounded-lg font-serif transition transform hover:-translate-y-[2px] motion-reduce:transition-none motion-reduce:hover:transform-none "
        >
          Borrar
        </button>
      </div>
    </Show>
  )
}
