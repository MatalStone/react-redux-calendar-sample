import { createStore, combineReducers } from "redux";
import * as toDo from "./ToDo";
import * as calendar from "./Calendar";

export interface ApplicationState {
  toDo: toDo.State;
  calendar: calendar.State;
}

const reducer = combineReducers({
  toDo: toDo.reducer as any,
  calendar: calendar.reducer as any,
});

const store = createStore(reducer);

export default store;
