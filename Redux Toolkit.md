# Redux Implementation Guide

## Implementation Steps

1. Create a store
2. Wrap components in Provider
3. Create slice (reducer function)
4. Export the reducers
5. Import reducers in store and make their entry in the store

## Core Concepts

### Provider

Synatax : provider store ={store}
Provider is used to wrap the components inside it so the wrapped components can access the store. This makes the Redux store available to any nested components that need to access it.

### Reducers

Reducers are functions which take the old state and an action, and update the state. They specify how the application's state changes in response to actions sent to the store.

### Actions

Actions are wrapped events. They are plain JavaScript objects that have a `type` field to indicate the type of action being performed.

### Slice

A slice contains all the states, name and actions inside it (reducer functions). It helps to organize related reducer logic and actions together.

### action.payload

Used to capture additional information about the action like value or input from a box. When you dispatch an action with data like `dispatch(increment(data))`, this data becomes available as `action.payload` in your reducer.

> **Note**: Always export the reducer at last!

## Redux Hooks

### useSelector

Used to bring the current state value from the store into your component. It allows you to extract data from the Redux store state.

### dispatch

Calls the reducer function defined in slice. This reducer calls the store and updates the value and returns the updated values to the component. It's the only way to trigger a state change in Redux.

## Data Flow Example

1. Component dispatches an action: `dispatch(increment(5))`
2. The value `5` becomes available as `action.payload` in the reducer
3. Reducer processes the action and updates state accordingly
4. Components using `useSelector` receive the updated state
