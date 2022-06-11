// source: https://stackblitz.com/edit/poc-blurhash-webworker?file=blurhashDecoder.worker.js,index.js
import { decode } from 'blurhash';

const weakCanvasStore = {}

self.onmessage = async ({ data }) => {
    let {
        hash,
        width,
        height,
        xCount,
        yCount,
        punch,
        id
    } = data;

    // console.time('offscreen canvas')

    if (data.canvas) {
        weakCanvasStore[id] = new WeakRef(data.canvas)
    }

    const canvas = weakCanvasStore[id]?.deref()

    if (!canvas) return;


    canvas.width = width || canvas.width;
    canvas.height = height || canvas.height;
    const ctx = canvas.getContext('2d');

    const pixels = decode(hash, xCount, yCount, punch);

    const imageData = ctx.createImageData(xCount, yCount);
    imageData.data.set(pixels);

    const img = await createImageBitmap(imageData, 0, 0, xCount, yCount)

    // ctx.imageSmoothingEnabled = true
    // ctx.imageSmoothingQuality = 'high'
    // ctx.filter = `blur(4px)`
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

    // console.timeEnd('offscreen canvas')
}
