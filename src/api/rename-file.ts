import { api } from './api'

export const renameFile = (
  hash: string,
  oldPath: string,
  newPath: string,
): Promise<void> =>
  api
    .url('/api/v2/torrents/renameFile')
    .formUrl({ hash, oldPath, newPath })
    .post()
    .text()
