import React, { FC, useEffect, useRef, useMemo } from 'react';
// Use blurhash instead of fast-blurhash, because it's an import for version without webworker (Safari).
// And on Safari fast-blurhash is slower than blurash.
import { decode } from 'blurhash';
import type { BlurhashCanvasProps } from './types'
import { blurhashCanvasDefaultProps } from './props'
import worker from './worker'

// @ts-ignore [sto lat za cywilizowanym swiatem]
const isOffscreenSupport = typeof OffscreenCanvas !== 'undefined'

let idGen = 0

const BlurhashCanvasWorker: FC<BlurhashCanvasProps> = ({ loading, hash, width, height, punch, imageRef, ...props }) => {
  const ref = useRef<HTMLCanvasElement>()
  const offCanvasRef = useRef<HTMLCanvasElement>()
  const isTransferedCanvasRef = useRef<boolean>()
  const id = useMemo(() => ++idGen, [])

  useEffect(() => {
    if (imageRef?.current?.complete) return
    const canvas = ref.current;
    if (!canvas) return

    const isTransfered = isTransferedCanvasRef.current

    if (!isTransfered) {
      // @ts-ignore [HTMLCanvasElement 2077]
      offCanvasRef.current = canvas.transferControlToOffscreen()
    }

    const offCanvas = offCanvasRef.current

    const msg = { width, height, punch, hash, id }

    worker.postMessage(isTransfered ? msg : { ...msg, canvas: offCanvas }, isTransfered ? [] : [offCanvas])
    isTransferedCanvasRef.current = true

  }, [hash, width, height, punch])

  return <canvas {...props} height={height} width={width} ref={ref} />
}

const BlurhashCanvasFallback: FC<BlurhashCanvasProps> = ({ loading, hash, width, height, punch, imageRef, ...props }) => {
  const ref = useRef()

  useEffect(() => {
    if (imageRef?.current?.complete) return

    const draw = () => {
      const canvas: HTMLCanvasElement = ref.current;
      if (!canvas) return

      const pixels = decode(hash, width, height, punch);
      const ctx = canvas.getContext('2d');
      const imageData = ctx.createImageData(width, height);
      imageData.data.set(pixels);
      ctx.putImageData(imageData, 0, 0);
    }

    if (loading === 'lazy') {
      const timeout = setTimeout(draw, 0)

      return () => clearTimeout(timeout)
    } else {
      draw()
    }

  }, [hash, width, height, punch])

  return <canvas {...props} height={height} width={width} ref={ref} />
}

const BlurhashCanvas: FC<BlurhashCanvasProps> = ({ loading, ...props }) => {
  const canUseWorker = isOffscreenSupport && !!worker && loading === 'lazy'
  const Component = canUseWorker ? BlurhashCanvasWorker : BlurhashCanvasFallback

  return <Component loading={loading} {...props} />
}

BlurhashCanvas.defaultProps = blurhashCanvasDefaultProps

export default BlurhashCanvas
