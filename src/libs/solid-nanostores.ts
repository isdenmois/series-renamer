import type { ReadableAtom } from 'nanostores'
import { createSignal, onCleanup } from 'solid-js'

export function useSignal<T>(store: ReadableAtom<T>) {
  const [state, setState] = createSignal(store.get())

  const unsubscribe = store.subscribe((newValue: any) => {
    setState(newValue)
  })

  onCleanup(() => unsubscribe())

  return state
}
