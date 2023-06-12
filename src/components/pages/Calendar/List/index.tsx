import { useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ApplicationState } from "../../../../store";
import {
  CalendarItem,
  CalendarListItem,
  State as CalendarState,
  KnownAction as CalendarKnownAction,
  ADD_NOTE,
  AddNote,
  UPDATE_NOTE,
  UpdateNote,
  REMOVE_NOTE,
  RemoveNote,
} from "../../../../store/Calendar";

interface IActionProps {
  addNote: (item: CalendarItem) => AddNote;
  updateNote: (item: CalendarListItem) => UpdateNote;
  removeNote: (id: number) => RemoveNote;
}

type InnerProps = CalendarState & IActionProps;

function CalendarList({ toDos, addNote, updateNote, removeNote }: InnerProps) {
  const [additionalDate, setAdditionalDate] = useState("");
  const [additionalText, setAdditionalText] = useState("");
  const [updatableId, setUpdatableId] = useState("");
  const [updatableDate, setUpdatableDate] = useState("");
  const [updatableText, setUpdatableText] = useState("");

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Date</th>
            <th>Note</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {toDos.map((item) => (
            <tr key={`row${item.id}`}>
              <td>{item.id}</td>
              <td>{`${item.date.getFullYear()}/${
                item.date.getMonth() + 1
              }/${item.date.getDate()}`}</td>
              <td>{item.note}</td>
              <td>
                <button
                  onClick={() => {
                    removeNote(item.id);
                    setUpdatableId("");
                  }}
                  type="button"
                  className="btn text-danger"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="row">
        <div className="col-2">
          <input
            value={additionalDate}
            onChange={(e) => {
              setAdditionalDate(e.target.value);
            }}
            type="date"
            className="form-control"
          />
        </div>
        <div className="col-8">
          <div className="form-group">
            <input
              value={additionalText}
              onChange={(e) => {
                setAdditionalText(e.target.value);
              }}
              type="text"
              placeholder="Please input a note to add."
              className="form-control"
            />
          </div>
        </div>
        <div className="col-2">
          <button
            onClick={() => {
              if (additionalDate == null || additionalDate === "") {
                return;
              }
              addNote({ date: new Date(additionalDate), note: additionalText });
            }}
            type="button"
            className="btn btn-primary"
          >
            Add note
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <div className="form-group">
            <select
              value={updatableId}
              onChange={(e) => setUpdatableId(e.target.value)}
              className="form-control"
            >
              <option disabled value="">
                Note No.
              </option>
              {toDos.map((item) => (
                <option key={`id${item.id}`}>{item.id}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-2">
          <input
            value={updatableDate}
            onChange={(e) => setUpdatableDate(e.target.value)}
            type="date"
            className="form-control"
          />
        </div>
        <div className="col-6">
          <div className="form-group">
            <input
              value={updatableText}
              onChange={(e) => setUpdatableText(e.target.value)}
              type="text"
              placeholder="Please input a note to update."
              className="form-control"
            />
          </div>
        </div>
        <div className="col-2">
          <button
            onClick={() => {
              if (
                updatableDate == null ||
                updatableDate === "" ||
                updatableId == null ||
                updatableId === ""
              ) {
                return;
              }
              const id = Number(updatableId);
              if (isNaN(id)) {
                return;
              }
              updateNote({
                id,
                date: new Date(updatableDate),
                note: updatableText,
              });
            }}
            type="button"
            className="btn btn-primary"
          >
            Update note
          </button>
        </div>
      </div>
    </div>
  );
}

const stateToProps = (state: ApplicationState): CalendarState => {
  return {
    ...state.calendar,
  };
};

const dispatchToProps = (
  dispatch: Dispatch<CalendarKnownAction>
): IActionProps => {
  return {
    addNote: (item: CalendarItem) =>
      dispatch<AddNote>({ type: ADD_NOTE, item }),
    updateNote: (item: CalendarListItem) =>
      dispatch<UpdateNote>({ type: UPDATE_NOTE, item }),
    removeNote: (id: number) => dispatch<RemoveNote>({ type: REMOVE_NOTE, id }),
  };
};

export default connect(stateToProps, dispatchToProps)(CalendarList);
