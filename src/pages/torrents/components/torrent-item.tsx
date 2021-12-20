import { Component } from 'solid-js'

import { Torrent } from 'api'
import { $selectedTorrent } from 'features/renamer/model'
import { formatBytes } from 'libs/format-bytes'
import { formatDate } from 'libs/format-date'

import downloadIcon from './download-icon.png'
import c from './torrents.module.css'

interface Props {
  torrent: Torrent
}

export const TorrentItem: Component<Props> = ({ torrent }) => {
  const description = [formatBytes(torrent.size), formatDate(torrent.completion_on), torrent.save_path].join(' | ')

  return (
    <li class={c.listItem} onClick={() => $selectedTorrent.set(torrent.hash)}>
      <img class={c.icon} src={downloadIcon} />
      <div>
        <div class={c.title}>{torrent.name}</div>
        <div class={c.description}>{description}</div>
      </div>
    </li>
  )
}
