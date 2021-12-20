/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from 'solid-testing-library'

import { QFile } from 'api'
import { FileRenamer } from './file-renamer'

describe('<FileRenamer />', () => {
  it('should render input', () => {
    const file: QFile = { title: 'S01E01 Some Episode.mkv', filename: '01.mkv', episode: 1, season: 1, directory: '/' }
    render(() => <FileRenamer file={file} />)

    expect(screen.getByText('01.mkv')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveValue('S01E01 Some Episode.mkv')
  })

  it('should set file title on input event', () => {
    const file: QFile = { title: 'S02E02 New Episodes.mkv', filename: '02.mkv', episode: 2, season: 1, directory: '/' }
    render(() => <FileRenamer file={file} />)

    fireEvent.input(screen.getByRole('textbox'), { target: { value: 'S02E02 New Episode.mkv' } })
    expect(file.title).toBe('S02E02 New Episode.mkv')
  })
})
