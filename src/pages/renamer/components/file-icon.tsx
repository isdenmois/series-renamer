import { Component } from 'solid-js'

interface Props {
  title: string
}

export const FileIcon: Component<Props> = (props) => {
  return (
    <svg viewBox='0 0 115.28 122.88' width='32'>
      <g>
        <path
          fill='#058ded'
          fill-rule='evenodd'
          clip-rule='evenodd'
          d='M 21.69 57 h 68.56 V 37.34 H 69.59 c -2.17 0 -5.19 -1.17 -6.62 -2.6 c -1.43 -1.43 -2.3 -4.01 -2.3 -6.17 V 7.64 l 0 0 H 8.15 c -0.18 0 -0.32 0.09 -0.41 0.18 C 7.59 7.92 7.55 8.05 7.55 8.24 v 106.45 c 0 0.14 0.09 0.32 0.18 0.41 c 0.09 0.14 0.28 0.18 0.41 0.18 c 22.78 0 58.09 0 81.51 0 c 0.18 0 0.17 -0.09 0.27 -0.18 c 0.14 -0.09 0.33 -0.28 0.33 -0.41 v -11.16 H 21.69 c -4.14 0 -7.56 -3.4 -7.56 -7.56 V 64.55 C 14.13 60.4 17.53 57 21.69 57 L 21.69 57 z M 97.79 57 h 9.93 c 4.16 0 7.56 3.41 7.56 7.56 v 31.42 c 0 4.15 -3.41 7.56 -7.56 7.56 h -9.93 v 13.55 c 0 1.61 -0.65 3.04 -1.7 4.1 c -1.06 1.06 -2.49 1.7 -4.1 1.7 c -29.44 0 -56.59 0 -86.18 0 c -1.61 0 -3.04 -0.64 -4.1 -1.7 c -1.06 -1.06 -1.7 -2.49 -1.7 -4.1 V 5.85 c 0 -1.61 0.65 -3.04 1.7 -4.1 c 1.06 -1.06 2.53 -1.7 4.1 -1.7 h 58.72 C 64.66 0 64.8 0 64.94 0 c 0.64 0 1.29 0.28 1.75 0.69 h 0.09 c 0.09 0.05 0.14 0.09 0.23 0.18 l 29.99 30.36 c 0.51 0.51 0.88 1.2 0.88 1.98 c 0 0.23 -0.05 0.41 -0.09 0.65 V 57 L 97.79 57 z M 67.52 27.97 V 8.94 l 21.43 21.7 H 70.19 c -0.74 0 -1.38 -0.32 -1.89 -0.78 C 67.84 29.4 67.52 28.71 67.52 27.97 L 67.52 27.97 z'
        />
        <text x='65' y='96' fill='white' text-anchor='middle' font-size='44'>
          {props.title}
        </text>
      </g>
    </svg>
  )
}
