/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { cleanStores } from 'nanostores'
import { fireEvent, render, screen } from 'solid-testing-library'

import { $selectedTorrent } from 'features/renamer/model'
import { TorrentItem } from './torrent-item'

describe('<TorrentItem/>', () => {
  it('should render Torrent item', () => {
    const { container } = render(() => (
      <TorrentItem
        torrent={{ hash: '123456', name: 'Haro Haro', size: 2048000, completion_on: 1639729654, save_path: '/Series' }}
      />
    ))
    const querySelector = (selector: string) => container.getElementsByClassName(selector).item(0)!

    expect(querySelector('title')).toHaveTextContent('Haro Haro')
    expect(querySelector('description')).toHaveTextContent('1.95 MB | 17.12.2021, 11:27:34 | /Series')
  })

  it('should set $selectedTorrent on click', () => {
    $selectedTorrent.set(null)

    render(() => (
      <TorrentItem
        torrent={{ hash: 'abcdef', name: 'Haro Haro', size: 2048000, completion_on: 1639729654, save_path: '/Series' }}
      />
    ))

    expect($selectedTorrent.get()).toBeNull()

    fireEvent.click(screen.getByRole('listitem'))

    expect($selectedTorrent.get()).toBe('abcdef')

    cleanStores($selectedTorrent)
  })
})
