// @ts-ignore
import React, { FC, useEffect, useRef, useMemo } from 'react';
import { decode } from 'blurhash';
import worker from './worker'

export type Props = React.CanvasHTMLAttributes<HTMLCanvasElement> & {
  hash: string;
  height?: number;
  punch?: number;
  width?: number;
  loading?: 'eager' | 'lazy'
};

// @ts-ignore
const isOffscreenSupport = typeof OffscreenCanvas !== 'undefined'

let idGen = 0

const BlurhashCanvasWorker: FC<Props> = ({ loading = 'lazy', hash, width = 128, height = 128, punch, ...props }) => {
  const ref = useRef()
  const offCanvasRef = useRef()
  const isTransferedCanvasRef = useRef()
  const id = useMemo(() => ++idGen, [])

  useEffect(() => {
    const canvas = ref.current;
    const isTransfered = isTransferedCanvasRef.current

    if (!isTransfered) {
      // @ts-ignore
      offCanvasRef.current = canvas.transferControlToOffscreen()
    }

    const offCanvas = offCanvasRef.current

    const msg = { width, height, xCount: width, yCount: height, punch, hash, id }

    if (isTransfered) {
      worker.postMessage(msg)
    } else {
      worker.postMessage({ ...msg, canvas: offCanvas }, [offCanvas])
    }
    // @ts-ignore
    isTransferedCanvasRef.current = true

  }, [hash, width, height, punch])

  return <canvas {...props} height={height} width={width} ref={ref} />
}

const BlurhashCanvasFallback: FC<Props> = ({ loading, hash, width = 128, height = 128, punch, ...props }) => {
  const ref = useRef()

  useEffect(() => {
    const draw = () => {
      const canvas: HTMLCanvasElement = ref.current;

      if (canvas) {
        // console.time('draw canvas')

        const pixels = decode(hash, width, height, punch);
        const ctx = canvas.getContext('2d');
        const imageData = ctx.createImageData(width, height);
        imageData.data.set(pixels);
        ctx.putImageData(imageData, 0, 0);

        // console.timeEnd('draw canvas')
      }
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

const BlurhashCanvas: FC<Props> = ({ loading = 'lazy', ...props }) => {
  const canUseWorker = isOffscreenSupport && !!worker && loading === 'lazy'
  const Component = canUseWorker ? BlurhashCanvasWorker : BlurhashCanvasFallback

  return <Component loading={loading} {...props} />
}

export default BlurhashCanvas
