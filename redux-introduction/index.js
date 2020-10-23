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

// App Code
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

function addToDoAction(todo){
  return {
    type: ADD_TODO,
    todo
  };
}

function removeToDoAction(id){
  return {
    type: REMOVE_TODO,
    id
  }
}

function toggleTodoAction(id){
  return {
    type: TOGGLE_TODO,
    id
  }
}

function addGoalAction(goal){
  return {
    type: ADD_GOAL,
    goal
  };
}

function removeGoalAction(id){
  return {
    type: REMOVE_GOAL,
    id
  }
}

// APP CODE REDUX - Reducer
const todos = (state = [], action) => {
  if (action.type === "ADD_TODO") {
    return state.concat([action.todo]);
  } else if (action.type === "REMOVE_TODO") {
    return state.filter((st) => st.id !== action.id);
  } else if (action.type === "TOGGLE_TODO") {
    return state.map((st) =>
      st.id === action.id
        ? Object.assign({}, st, { complete: !st.complete })
        : st
    );
  } else {
    return state;
  }
};

// Reducer for goals

function goals(state = [], action){
  switch(action.type){
    case 'ADD_GOAL':
      return state.concat([action.goal])
    case 'REMOVE_GOAL':
      return state.filter(goal => goal.id !== action.id)
    default:
      return state;
  }
}

function app (state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action),
  }
}

// App Code
let store;

store = createStore(app);

unsubscribeStore = store.subscribe(() => {
  console.log("curent state is :", store.getState());
});

store.dispatch(addToDoAction({
  id: 0,
  name: 'Walk the dog',
  complete: false,
}));

store.dispatch(addToDoAction({
    id: 1,
    name: 'Wash the car',
    complete: false
}));

store.dispatch(addToDoAction({
    id: 2,
    name: 'Go to the gym',
    complete: true,
  }));

store.dispatch(removeToDoAction(1))

store.dispatch(toggleTodoAction(0))

store.dispatch(addGoalAction({
     id: 0,
     name: 'Learn Redux'
  }));

store.dispatch(addGoalAction({
    id: 1,
    name: 'Lose 20 pounds'
  }));

store.dispatch(removeGoalAction(0))

unsubscribeStore();