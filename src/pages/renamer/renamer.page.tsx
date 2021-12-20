import { Component, createResource, For, Show } from 'solid-js'

import { api } from 'api'
import { $selectedTorrent } from 'features/renamer/model'
import { useSignal } from 'libs/solid-nanostores'

import { FileRenamer } from './components/file-renamer'
import c from './components/file-renamer.module.css'
import { RenamingProgress } from './components/renaming-progress'
import { $renameProgress, renameFiles } from './renamer.model'

const cancel = () => $selectedTorrent.set(null)

export const RenamerPage: Component = () => {
  const renameProgress = useSignal($renameProgress)
  const [list] = createResource($selectedTorrent.get(), api.fetchFiles)
  const startProcess = () => {
    renameFiles(list()!)
  }

  return (
    <Show
      when={renameProgress() < 0}
      fallback={<RenamingProgress filesCount={list()!.length} />}
    >
      <ul class={c.list}>
        <For each={list()}>{(file) => <FileRenamer file={file} />}</For>
      </ul>

      <div class={c.footer}>
        <button onClick={cancel}>Cancel</button>
        <button
          class={c.active}
          disabled={!list()?.length}
          onClick={startProcess}
        >
          Rename
        </button>
      </div>
    </Show>
  )
}
