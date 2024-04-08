import { CustomCalendar } from "../calendar";
import "./styles/index.scss";
import { Loader } from "../shared/ui/loader";
import { tasksCalendarStore } from "../calendar/model";

export const App = () => {
  const isLoading = tasksCalendarStore(state => state.isLoading);
  
  return (
    <div>
      {isLoading ? <Loader /> : null}
      <CustomCalendar />
    </div>
  );
};