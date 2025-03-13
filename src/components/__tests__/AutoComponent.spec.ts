import { afterEach, cleanup, describe, expect, it, render, screen, vi } from '@/test-utils'

import AutoComponent from '@/components/AutoComponent.vue'

describe('<AutoComponent />', () => {
  const setup = () => {
    const mockFunction = vi.fn()

    const agrs = render(AutoComponent, { props: { clickMe: mockFunction, text: 'fuck you' } })

    return {
      mockFunction,
      ...agrs,
    }
  }

  afterEach(() => {
    cleanup()
  })

  it('should render component AutoComponent', () => {
    setup()

    expect(screen.getByText('hello man')).toBeInTheDocument()
    expect(screen.getByText('hello dude naja')).toBeInTheDocument()
    expect(screen.getByText('fuck you')).toBeInTheDocument()
  })

  it('should call button event click me', async () => {
    const { mockFunction, user } = setup()

    const getBtn = screen.getByTestId('btn-test-naja')

    await user.click(getBtn)

    expect(mockFunction).toHaveBeenCalledOnce()
  })
})
