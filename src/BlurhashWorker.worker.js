// source: https://stackblitz.com/edit/poc-blurhash-webworker?file=blurhashDecoder.worker.js,index.js
import { decode } from 'blurhash';

let ctx;
let pixels;
let imageData;

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
        // canvas = data.canvas
        weakCanvasStore[id] = new WeakRef(data.canvas)
    }

    const canvas = weakCanvasStore[id].deref()

    if (!canvas) return;


    canvas.width = width || canvas.width;
    canvas.height = height || canvas.height;
    ctx = canvas.getContext('2d');

    pixels = decode(hash, xCount, yCount, punch);

    imageData = ctx.createImageData(xCount, yCount);
    imageData.data.set(pixels);

    const img = await createImageBitmap(imageData, 0, 0, xCount, yCount)

    // ctx.imageSmoothingEnabled = true
    // ctx.imageSmoothingQuality = 'high'
    // ctx.filter = `blur(10px)`
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

    // console.timeEnd('offscreen canvas')
}
