import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const here = path.dirname(fileURLToPath(import.meta.url))
const repo = path.resolve(here, '..')

export default defineConfig({
  resolve: { alias: [{ find: /^@\//, replacement: `${repo}/` }] },
  test: {
    root: repo,
    include: ['tests/**/*.test.tsx'],
    environment: 'jsdom',
    setupFiles: ['tests/setup/setup.tsx'],
    coverage: {
      provider: 'v8',
      reportsDirectory: path.join(here, 'coverage'),
      include: ['app/**/*.tsx', 'components/**/*.tsx', 'data/**/*.ts'],
      thresholds: { statements: 90, branches: 85, functions: 90, lines: 90 },
    },
  },
})
