import { useSignal } from 'libs/solid-nanostores'
import { Component } from 'solid-js'
import { $renameProgress } from '../renamer.model'

interface Props {
  filesCount: number
}

export const RenamingProgress: Component<Props> = (props) => {
  const progress = useSignal($renameProgress)

  return (
    <h1>
      {progress() + 1} / {props.filesCount}
    </h1>
  )
}
