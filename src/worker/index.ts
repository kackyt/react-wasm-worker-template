import * as Comlink from 'comlink'

type SampleWorkerApi = {
  add: (left: number, right: number) => Promise<number>
}

export class SampleWorker {
  worker!: Worker
  api!: Comlink.Remote<SampleWorkerApi>

  constructor() {
    this.initializeWorker()
  }

  initializeWorker() {
    this.worker = new Worker(new URL('./worker.ts', import.meta.url), {
      type: 'module',
    })
    this.api = Comlink.wrap(this.worker)
  }

  terminate() {
    this.worker.terminate()
  }

  restart() {
    this.terminate()
    this.initializeWorker()
  }
}
