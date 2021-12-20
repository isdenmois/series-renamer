import { sortBy } from 'libs/sort'
import { api } from './api'

export interface Torrent {
  hash: string
  name: string
  save_path: string
  completion_on: number
  size: number
}

export const fetchTorrents = async (): Promise<Torrent[]> => {
  const list = await api.url('/api/v2/torrents/info').get().json<Torrent[]>()

  list.forEach((i) => {
    if (i.save_path.endsWith('\\')) {
      i.save_path = i.save_path.slice(0, -1)
    }
  })

  return sortBy(list, 'name')
}
