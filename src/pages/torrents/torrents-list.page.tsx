import { api } from 'api'
import { Component, createMemo, createResource, createSignal, For } from 'solid-js'

import { Categories } from './components/categories'
import { TorrentItem } from './components/torrent-item'
import c from './components/torrents.module.css'

// FIXME: get it from the storage
const INITIAL_CATERGORY = 'E:\\Series'

export const TorrentsListPage: Component = () => {
  const [category, setCategory] = createSignal<string | null>(
    INITIAL_CATERGORY,
  )
  const [data] = createResource(api.fetchTorrents)
  const setSelected = (selected: string) => setCategory((prev) => (prev === selected ? null : selected))
  const list = createMemo(() => {
    const save_path = category()
    const torrents = data() || []

    if (save_path) {
      return torrents.filter((t) => t.save_path === save_path)
    }

    return torrents
  })

  return (
    <>
      <Categories
        torrents={data() || []}
        selected={category()}
        setSelected={setSelected}
      />

      <ul class={c.list} data-testid='torrents'>
        <For each={list()}>
          {(torrent) => <TorrentItem torrent={torrent} />}
        </For>
      </ul>
    </>
  )
}
