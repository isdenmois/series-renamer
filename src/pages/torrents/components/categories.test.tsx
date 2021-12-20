/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from 'solid-testing-library'

import { Categories } from './categories'

const torrents: any[] = [
  { save_path: '/Downloads' },
  { save_path: '/Series' },
  { save_path: '/Cources' },
  { save_path: '/Downloads' },
  { save_path: '/Series' },
  { save_path: '/Languages' },
]

describe('<Categories/>', () => {
  it('should render empty list', () => {
    const setSelected = jest.fn()

    render(() => <Categories selected='/Series' setSelected={setSelected} torrents={[]} />)

    expect(screen.getByRole('list')).toBeTruthy()
    expect(screen.queryByRole('listitem')).toBeFalsy()
  })

  it('should render list', () => {
    const setSelected = jest.fn()

    render(() => <Categories selected='/Series' setSelected={setSelected} torrents={torrents} />)

    expect(screen.getByRole('list')).toBeTruthy()

    const listItems = screen.queryAllByRole('listitem')

    expect(listItems.length).toBe(4)
    expect(listItems.map(item => item.textContent)).toEqual(['/Cources', '/Downloads', '/Languages', '/Series'])
    expect(setSelected).not.toHaveBeenCalled()
  })

  it('should call setSelected on category click', () => {
    const setSelected = jest.fn()

    render(() => <Categories selected='/Series' setSelected={setSelected} torrents={torrents} />)

    fireEvent.click(screen.queryAllByRole('listitem')[0])

    expect(setSelected).toHaveBeenCalledWith('/Cources')
  })
})
