import type { BlurhashProps, BlurhashCanvasProps } from './types'

export const blurhashDefaultProps = {
    height: 128,
    width: 128,
    resolutionX: 32,
    resolutionY: 32
} as BlurhashProps

export const blurhashCanvasDefaultProps = {
    loading: 'lazy',
    width: 128,
    height: 128
  } as BlurhashCanvasProps