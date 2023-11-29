/* ./worker/worker.ts */
import init, { add } from 'wasm'
import * as Comlink from 'comlink'

// 初期化済みフラグ
let isInitialized = false

// webworker上でwasmを初期化
init().then(() => {
  isInitialized = true
})

const api = {
  async add(
    left: number, right: number
  ) {
    if (!isInitialized) {
      throw new Error('WASM module is not ready')
    }
    const result = add(left, right)

    return result
  },
}

Comlink.expose(api)
