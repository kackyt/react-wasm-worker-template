import { useCallback, useEffect, useRef, useState } from "react"
import { SampleWorker } from "./worker"
import "./App.css"

function App() {
  const a = useRef<HTMLInputElement>(null)
  const b = useRef<HTMLInputElement>(null)
  const worker = useRef<SampleWorker>()
  const [result, setResult] = useState(0)

  const handleClick = useCallback(async () => {
    if (a.current && b.current && worker.current) {
      const left = parseInt(a.current.value)
      const right = parseInt(b.current.value)

      const res = await worker.current.api.add(left, right)
      setResult(res)
    }
  }, [])

  useEffect(() => {
    // webworkerの作成と破棄
    if (!worker.current) {
      worker.current = new SampleWorker()
    }

    return () => {
      if (worker.current) {
        worker.current.terminate()
        worker.current = undefined
      }
    }
  })

  return (
    <>
      <div className="card">
        <input type="text" ref={a} />
        +
        <input type="text" ref={b} />
        =
        <input type="text" value={result} readOnly={true} />
        <button onClick={handleClick}>calc</button>
      </div>
    </>
  )
}

export default App
