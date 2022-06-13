export class CorsWorker {
    constructor(url) {
      const absoluteUrl = new URL(url, window.location.href).toString()
      const workerSource = `\
    const urlString = ${JSON.stringify(absoluteUrl)}
    const originURL = new URL(urlString)
    const originalImportScripts = self.importScripts
    self.importScripts = (url) => originalImportScripts.call(self, new URL(url, originURL).toString())
    importScripts(urlString);
  `
      const blob = new Blob([workerSource], { type: 'application/javascript' })
      const objectURL = URL.createObjectURL(blob)
      // @ts-ignore
      this.worker = new Worker(objectURL)
      URL.revokeObjectURL(objectURL)
    }
  
    getWorker() {
        // @ts-ignore
      return this.worker
    }
  }