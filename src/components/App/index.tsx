import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "../../components/shared/Header";
import CalendarList from "../pages/Calendar/List";
import CalendarView from "../pages/Calendar/View";
import ToDo from "../pages/ToDo";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={`/`} element={<Navigate replace to="/todo" />} />
        <Route path={`/todo`} element={<ToDo />} />
        <Route
          path={`/calendar`}
          element={<Navigate replace to="/calendar/list" />}
        />
        <Route path={`/calendar/list`} element={<CalendarList />} />
        <Route path={`/calendar/view`} element={<CalendarView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
