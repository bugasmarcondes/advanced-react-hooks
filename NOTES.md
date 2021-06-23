### useReducer

- An alternative to useState. Accepts a reducer of type (state, action) =>
  newState, and returns the current state paired with a dispatch method.
- useReducer is usually preferable to useState when you have complex state logic
  that involves multiple sub-values or when the next state depends on the
  previous one.

### Memoization

- In computing, memoization or memoisation is an optimization technique used
  primarily to speed up computer programs by storing the results of expensive
  function calls and returning the cached result when the same inputs occur
  again.

### useCallback

- Returns a memoized callback.

### useMemo

- Returns a memoized value.

### So when should I useMemo and useCallback?

- When you define an object inside your React function component, it is not
  going to be referentially equal to the last time that same object was defined
  (even if it has all the same properties with all the same values).
- It means that if the dependecy properties are non-primitive type
  (objects/arrays/functions), they will be different on every re-render.
- This is precisely the reason why useCallback and useMemo exist. So here's how
  you'd fix that (all together now):

```javascript
function Foo({bar, baz}) {
  React.useEffect(() => {
    const options = {bar, baz}
    buzz(options)
  }, [bar, baz])
  return <div>foobar</div>
}
function Blub() {
  const bar = React.useCallback(() => {}, [])
  const baz = React.useMemo(() => [1, 2, 3], [])
  return <Foo bar={bar} baz={baz} />
}
```

### useContext

Used for sharing state between components. Usually we follow this possible steps
for resolution:

1. lift your state
2. composition

- Mount the component tree and send the desired prop only in the component that
  really needs it. All the other parent components simply receive { children }
  and load them.
- By composing we can turn those parent components into something customizable.
  We can even choose which other components are we going to pass inside the
  parent, which further will be passed as props and loaded properly.

3. useContext if none of the above suited

UseContext insert state into a section of our react tree, and then extract that
state anywhere within that react tree without having to explicitly pass it
everywhere.

A component calling useContext will always re-render when the context value
changes. If re-rendering the component is expensive, you can optimize it by
using memoization.

```javascript
import * as React from 'react'

const FooContext = React.createContext()

function FooDisplay() {
  const foo = React.useContext(FooContext)
  return <div>Foo is: {foo}</div>
}

ReactDOM.render(
  <FooContext.Provider value="I am foo">
    <FooDisplay />
  </FooContext.Provider>,
  document.getElementById('root'),
)
// renders <div>Foo is: I am foo</div>
```

After configuring the context, we can extract that logic into a separate file
"context/count-context" and simply import it whenever we need it.

```javascript
// contents of file ./context/count-context.js
const CountContext = React.createContext()

const CountProvider = props => {
  const [count, setCount] = React.useState(0)
  return <CountContext.Provider value={[count, setCount]} {...props} />
}

function useCount() {
  const context = React.useContext(CountContext)
  if (!context) {
    throw new Error(`useCount must be used within the CounterProvider`)
  }
  return context
}

+++++

import {CountProvider, useCount} from "context/count-context"
```

### useEffect

- By default, effects run after every completed render, but you can choose to
  fire them only when certain values have changed.

- Often, effects create resources that need to be cleaned up before the
  component leaves the screen, such as a subscription or timer ID. We achieve
  this by cleaning up an effect.

### useLayoutEffect

- The signature is identical to useEffect, but it fires synchronously after all
  DOM mutations.

- Here’s the simple rule for when you should use useLayoutEffect: If you are
  making observable changes to the DOM, then it should happen in
  useLayoutEffect, otherwise useEffect.

### useImperativeHandle

- useImperativeHandle customizes the instance value that is exposed to parent
  components when using ref. As always, imperative code using refs should be
  avoided in most cases.

### Imperative vs Declarative programming

- State is basically information about something held in memory.
- [Imperative way] In the first two examples we create a variable called
  results, and then we continually modify it. In the third example, we don’t
  have any variables, but we still have state living in the DOM itself — we then
  modify that state in the DOM.
- Declarative Programming is programming with declarations, i.e., declarative
  sentences.
- Declarative languages contrast with imperative languages which specify
  explicit manipulation of the computer’s internal state; or procedural
  languages which specify an explicit sequence of steps to follow.

### useDebugValue

- useDebugValue can be used to display a label for custom hooks in React
  DevTools.
- React.useDebugValue(`${query} -> ${state}`), simple version
- React.useDebugValue({query, state}, formatDebugValue), formatted version for
  cases where we have some expensive computational work being done
