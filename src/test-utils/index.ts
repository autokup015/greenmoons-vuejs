import userEvent from '@testing-library/user-event'
import { render, type RenderOptions } from '@testing-library/vue'

const CustomRender = <T>(ui: T, props: RenderOptions<T>) => {
  return {
    user: userEvent.setup(),
    ...render(ui, props),
  }
}

export * from '@testing-library/jest-dom/vitest'
export * from '@testing-library/vue'
export * from 'vitest'
export { CustomRender as render }
