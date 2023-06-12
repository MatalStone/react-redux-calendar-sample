import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { connect } from "react-redux";
import { ApplicationState } from "../../../../store";
import { State as CalendarState } from "../../../../store/Calendar";

type InnerProps = CalendarState;

function CalendarView({ toDos }: InnerProps) {
  const events = toDos.map((item) => ({ title: item.note, start: item.date }));

  return (
    <div className="container">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locale="ja" // 日本語化
        events={events}
      />
    </div>
  );
}

const stateToProps = (state: ApplicationState): CalendarState => {
  return {
    ...state.calendar,
  };
};

export default connect(stateToProps)(CalendarView);
