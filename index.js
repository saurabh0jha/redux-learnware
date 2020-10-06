/**
 * LIBRARY CODE
 */

const createStore = () => {
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
    state = todos(state, action);
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
    if (action.type === "ADD_TODOS") {
      return state.concat(action.todo);
    }
    return state;
  };
  


// App Code
const store = createStore();

unsubscribeStore = store.subscribe(() => {
  console.log("curent state is :", store.getState());
});

store.dispatch({
  type: "ADD_TODOS",
  todo: {
    id: 1,
    name: "Finish Lesson 1"
  },
});

unsubscribeStore();
