import type { QFile } from 'api'
import { Component } from 'solid-js'
import { FileIcon } from './file-icon'
import c from './file-renamer.module.css'

interface Props {
  file: QFile
}

export const FileRenamer: Component<Props> = ({ file }) => {
  const setTitle = (e: any) => {
    file.title = e.target.value
  }

  return (
    <li class={c.item}>
      <FileIcon title={'' + file.episode} />

      <div class={c.inputWrapper}>
        <label for={file.filename}>{file.filename}</label>
        <input id={file.filename} name={file.filename} value={file.title} onInput={setTitle} />
      </div>
    </li>
  )
}
