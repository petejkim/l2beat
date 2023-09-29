import { useState } from 'preact/hooks'

export function Counter() {
  const [count, setCount] = useState(0)
  return (
    <>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
    </>
  )
}
