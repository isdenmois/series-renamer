module.exports = {
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
  testEnvironment: 'node',
  transformIgnorePatterns: ['node_modules/(?!nanostores|@nanostores|.pnpm/nanostores)'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__mocks__/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy',
    'shared/(.*)': '<rootDir>/src/shared/$1',
    '^features/(.*)': '<rootDir>/src/features/$1',
    '^libs/(.*)': '<rootDir>/src/libs/$1',
    '^api': '<rootDir>/src/api',
    '^pages/(.*)': '<rootDir>/src/pages/$1',
    'solid-js/web': '<rootDir>/node_modules/solid-js/web/dist/web.cjs',
    'solid-js': '<rootDir>/node_modules/solid-js/dist/solid.cjs',
  },
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: [
    'node_modules',
    'src/app/index.ts',
    'src/shared/test-utils',
    'src/main.tsx',
    'src/background.ts',
  ],
}
