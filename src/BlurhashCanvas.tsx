import React, { FC, useLayoutEffect, useEffect, useRef } from 'react';
import { decode } from 'blurhash';

export type Props = React.CanvasHTMLAttributes<HTMLCanvasElement> & {
  hash: string;
  height?: number;
  punch?: number;
  width?: number;
  async?: boolean
};

// @ts-ignore
const worker = new Worker(new URL('./BlurhashWorker.worker', import.meta.url));

const BlurhashCanvas: FC<Props> = ({ async, hash, width = 128, height = 128, punch, ...props }) => {
  const ref = useRef()
  const offCanvasRef = useRef()
  const isTransferedCanvasRef = useRef()

  useEffect(() => {
    const canvas: HTMLCanvasElement = ref.current;
    if (canvas) {
      // @ts-ignore
      offCanvasRef.current = canvas.transferControlToOffscreen()
    }
  }, [])

  useEffect(() => {
    const canvas = ref.current;
    const offCanvas = offCanvasRef.current
    const isTransfered = isTransferedCanvasRef.current

    const msg = { width, height, xCount: width, yCount: height, punch, hash }

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

const BlurhashCanvas2: FC<Props> = ({ async, hash, width = 128, height = 128, punch, ...props }) => {
  const ref = useRef()

  useEffect(() => {
    const draw = () => {
      const canvas: HTMLCanvasElement = ref.current;

      if (canvas) {
        const pixels = decode(hash, width, height, punch);
        const ctx = canvas.getContext('2d');
        const imageData = ctx.createImageData(width, height);
        imageData.data.set(pixels);
        ctx.putImageData(imageData, 0, 0);
      }
    }

    if (async) {
      const timeout = setTimeout(draw, 0)

      return () => clearTimeout(timeout)
    } else {
      draw()
    }

  }, [hash, width, height, punch])

  return <canvas {...props} height={height} width={width} ref={ref} />
}

export default BlurhashCanvas
