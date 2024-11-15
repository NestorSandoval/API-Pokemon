import { createSignal, type Component, type JSX } from 'solid-js'

interface Props {
  initialValue: number
  children?: JSX.Element
}

export const Counter: Component<Props> = (props) => {
  const [counter, setCounter] = createSignal(props.initialValue)

  return (
    <div class="text-black">
      {props.children}

      <h1 class="text-4xl">counter</h1>
      <h3 class="text-xl">value: {counter()} </h3>

      <button
        onClick={() => setCounter((prev) => ++prev)}
        class="text-white bg-blue-500 p-2 mr-2 rounded"
      >
        +1
      </button>
      <button
        onClick={() => setCounter((prev) => --prev)}
        class="text-white bg-blue-500 p-2 mr-2 rounded"
      >
        -1
      </button>
    </div>
  )
}
