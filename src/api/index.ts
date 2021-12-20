import { fetchFiles } from './fetch-files'
import { fetchTorrents } from './fetch-torrents'
import { renameFile } from './rename-file'

export { QFile } from './fetch-files'
export { Torrent } from './fetch-torrents'

export const api = { fetchTorrents, fetchFiles, renameFile }
