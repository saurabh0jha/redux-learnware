/**
 * LIBRARY CODE
 */

const createStore = (reducer) => {
  // The store should have four parts
  // 1. The state
  // 2. Get the state.
  // 3. Listen to changes on the state.
  // 4. Update the state

  let state;
  let listeners = [];

  getState = () => state;

  subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  return {
    getState,
    subscribe,
    dispatch,
  };
};

// APP CODE REDUX - Reducer
const todos = (state = [], action) => {
  if (action.type === "ADD_TODO") {
    return state.concat(action.todo);
  }
  return state;
};

// App Code
const store = createStore(todos);

unsubscribeStore = store.subscribe(() => {
  console.log("curent state is :", store.getState());
});

store.dispatch({
  type: "ADD_TODO",
  todo: {
    id: 0,
    name: "Learn Redux",
    complete: false,
  },
});

store.dispatch({
    type: "ADD_TODO",
    todo: {
      id: 0,
      name: "Finish Chapter 1",
      complete: false,
    },
  });

unsubscribeStore();
