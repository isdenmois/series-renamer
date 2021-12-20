import { Torrent } from 'api'
import { Component, createMemo, For } from 'solid-js'

import c from './categories.module.css'

interface Props {
  selected: string | null
  torrents: Torrent[]
  setSelected: (category: string) => void
}

export const Categories: Component<Props> = (props) => {
  const categories = createMemo(() => [...new Set(props.torrents.map((t) => t.save_path))].sort())

  return (
    <ul class={c.list} data-testid='categories'>
      <For each={categories()}>
        {(category) => (
          <li
            class={c.item}
            classList={{ [c.selected]: category === props.selected }}
            onClick={() => props.setSelected(category)}
          >
            {category}
          </li>
        )}
      </For>
    </ul>
  )
}
