export interface CalendarItem {
  date: Date;
  note: string;
}

export interface CalendarListItem extends CalendarItem {
  id: number;
}

export interface State {
  toDos: CalendarListItem[];
}

const initialState: State = {
  toDos: [
    { id: 1, date: new Date("2023-06-01"), note: "予定1" },
    { id: 2, date: new Date("2023-07-01"), note: "予定2" },
    { id: 3, date: new Date("2023-08-01"), note: "予定3" },
  ],
};

export const ADD_NOTE = "CALENDAR/ADD_NOTE";
export const UPDATE_NOTE = "CALENDAR/UPDATE_NOTE";
export const REMOVE_NOTE = "CALENDAR/REMOVE_NOTE";

export interface AddNote {
  type: typeof ADD_NOTE;
  item: CalendarItem;
}

export interface UpdateNote {
  type: typeof UPDATE_NOTE;
  item: CalendarListItem;
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
        toDos: [
          ...state.toDos,
          {
            id,
            date: action.item.date,
            note: action.item.note,
          },
        ],
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
          .map((item, idx) => ({ ...item, id: idx + 1 })),
      };
    default:
      return state;
  }
};
