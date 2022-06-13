import { CorsWorker as Worker } from './CorsWorker'

let worker = null

if (typeof window !== 'undefined') {
    // @ts-ignore jebane gowno ts jest na poziomie cyfryzacji p0lski
    const corsWorker = new Worker(new URL('./BlurhashWorker.worker', import.meta.url))

    worker = corsWorker.getWorker()
  }

export default worker
