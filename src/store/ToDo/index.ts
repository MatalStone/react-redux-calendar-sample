export interface ToDoItem {
  id: number;
  note: string;
}

export interface State {
  toDos: ToDoItem[];
}

const initialState: State = {
  toDos: [
    { id: 1, note: "じゃがいも" },
    { id: 2, note: "にんじん" },
    { id: 3, note: "たまねぎ" },
    { id: 4, note: "しらたき" },
  ],
};

export const ADD_NOTE = "TODO/ADD_NOTE";
export const UPDATE_NOTE = "TODO/UPDATE_NOTE";
export const REMOVE_NOTE = "TODO/REMOVE_NOTE";

export interface AddNote {
  type: typeof ADD_NOTE;
  note: string;
}

export interface UpdateNote {
  type: typeof UPDATE_NOTE;
  item: ToDoItem;
}

export interface RemoveNote {
  type: typeof REMOVE_NOTE;
  id: number;
}

export type KnownAction = AddNote | UpdateNote | RemoveNote;

export const reducer = (state: State = initialState, action: KnownAction) => {
  switch (action.type) {
    case ADD_NOTE: {
      const id = Math.max(0, ...state.toDos.map((item) => item.id)) + 1;
      return {
        ...state,
        toDos: [...state.toDos, { id, note: action.note }],
      };
    }
    case UPDATE_NOTE:
      return {
        ...state,
        toDos: state.toDos.map((item) => {
          if (item.id === action.item.id) {
            return action.item;
          }
          return item;
        }),
      };
    case REMOVE_NOTE:
      return {
        ...state,
        toDos: state.toDos
          .filter((item) => item.id !== action.id)
          .map((item, idx) => ({ id: idx + 1, note: item.note })),
      };
    default:
      return state;
  }
};
