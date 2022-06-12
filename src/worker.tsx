let worker = null

if (typeof window !== 'undefined') {
    // @ts-ignore jebane gowno ts jest na poziomie cyfryzacji p0lski
    worker = new Worker(new URL('./BlurhashWorker.worker', import.meta.url))
  }

export default worker
