import { atom } from 'nanostores'

import { api, QFile } from 'api'
import { $selectedTorrent } from 'features/renamer/model'

export const $renameProgress = atom<number>(-1)

export const renameFiles = async (files: QFile[]) => {
  const hash = $selectedTorrent.get()!

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    $renameProgress.set(i)

    if (file.title !== file.filename) {
      await api.renameFile(hash, `${file.directory}/${file.filename}`, `${file.directory}/${file.title}`)
    }
  }

  $renameProgress.set(-1)
  $selectedTorrent.set(null)
}
