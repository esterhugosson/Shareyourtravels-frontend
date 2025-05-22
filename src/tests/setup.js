import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
})

import.meta.env = {
  VITE_APP_MAPBOX: 'test_token',
}

vi.mock('mapbox-gl', () => ({
  default: {
    Map: class {
      on() {}
      remove() {}
    },
  },
}))
