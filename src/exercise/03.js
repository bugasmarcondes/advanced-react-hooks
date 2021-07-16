// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
// @6
// import {CountProvider, useCount} from '../context/count-context'

// @1
const CountContext = React.createContext()

// @2
function CountProvider(props) {
  const [count, setCount] = React.useState(0)
  const value = [count, setCount]
  return <CountContext.Provider value={value} {...props} />
}

// @5
function useCount() {
  const context = React.useContext(CountContext)
  if (!context) {
    throw new Error(`useCount must be used within the CountProvider`)
  }
  return context
}

function CountDisplay() {
  // @4
  // const [count] = React.useContext(CountContext)
  // @5
  const [count] = useCount()
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  // @4
  // const [, setCount] = React.useContext(CountContext)
  // @5
  const [, setCount] = useCount()
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>Increment count</button>
}

function App() {
  return (
    <div>
      {/* @3 */}
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  )
}

export default App
