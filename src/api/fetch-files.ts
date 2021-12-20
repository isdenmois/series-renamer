import { api } from './api'

export interface Episode {
  episode: number
  season: number
  title: string
}

export interface QFile {
  directory: string | null
  filename: string
  episode: number
  season: number
  title: string
}

export const fetchFiles = async (hash: string): Promise<QFile[]> => {
  const files = await api
    .url(`/api/v2/torrents/files?hash=${hash}`)
    .get()
    .json<any[]>()
  const qfiles = parserFilesResponse(files)
  const episodes = parseEpisodesFromPage()

  return unifyPageEpisodesAndFiles(qfiles, episodes)
}

const EPISODES_PARSER: Record<string, () => Episode[]> = {
  'www.themoviedb.org': tmdbEpisodesParser,
  'www.imdb.com': imdbEpisodesParser,
}

export const parseEpisodesFromPage = () => {
  const episodesParser = EPISODES_PARSER[document.location.hostname]

  return episodesParser()
}

const REG_EXP = [/S(\d+)E(\d+)/i, /^()(\d+)\./i]

export function parserFilesResponse(files: any[]): QFile[] {
  return files
    .map((file) => {
      const slashIndex = file.name.lastIndexOf('/')
      const directory = slashIndex > 0 ? file.name.slice(0, slashIndex) : null
      const filename = file.name.slice(slashIndex + 1)
      const [, season, episode] = filename.match(REG_EXP[0]) || filename.match(REG_EXP[1]) || []

      return {
        directory,
        filename,
        episode: +episode || -1,
        season: +season || -1,
        title: filename,
      }
    })
    .filter((qfile) => qfile.filename && qfile.episode > 0)
    .sort((a, b) => a.episode - b.episode)
}

const REPLACE_WITH_DOT_REGEX = /[:]/g
const REMOVE_REGEX = /[#"]/g

export function unifyPageEpisodesAndFiles(
  files: QFile[],
  episodes: Episode[],
): QFile[] {
  const result: Array<QFile | null> = files.map((file) => {
    const episode = episodes.find(
      (e) =>
        e.episode === file.episode
        && (e.season === file.season || file.season === -1),
    )

    if (episode) {
      file.season = episode.season

      const s = String(file.season).padStart(2, '0')
      const ep = String(file.episode).padStart(2, '0')
      const ext = file.filename.slice(file.filename.lastIndexOf('.') + 1)
      const title = episode.title
        .replace(REPLACE_WITH_DOT_REGEX, '.')
        .replace(REMOVE_REGEX, '')

      return { ...file, title: `S${s}E${ep}. ${title}.${ext}` }
    }

    return null
  })

  return result.filter(Boolean) as QFile[]
}

function tmdbEpisodesParser(): Episode[] {
  const episodes: Episode[] = Array.prototype.map.call(
    document.querySelectorAll('.episode_list > .card .title a'),
    (a) => ({
      episode: +a.attributes.episode.value,
      season: +a.attributes.season.value,
      title: a.innerText.trim(),
    }),
  )

  return episodes
}

function imdbEpisodesParser(): Episode[] {
  const seasonElement = document.getElementById(
    'bySeason',
  ) as HTMLSelectElement
  const season = +seasonElement.value
  const episodes: Episode[] = Array.prototype.map.call(
    document.querySelectorAll('[itemprop="episodes"]'),
    (info) => ({
      episode: +info.querySelector('[itemprop="episodeNumber"]').content,
      season,
      title: info.querySelector('a[itemprop="name"]').innerText,
    }),
  )

  return episodes
}
