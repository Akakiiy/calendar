import "./index.scss";
import moment, { type unitOfTime } from "moment";
import { useEffect, useMemo, useState } from "react";
import { Views } from "react-big-calendar";

import type { CalendarEventItem, CalendarViewType } from "../../../types";
import { AddCalendarTaskModal } from "../../add-calendar-task-modal";
import { CalendarControl } from "../../calendar-control";
import { EventsCalendar } from "../../events-calendar";
import { tasksCalendarStore } from "../../../model";
import { PreviewCalendarEventModal } from "../../preview-calendar-event-modal";

export const CustomCalendar = () => {
  const getEventsFromTo = tasksCalendarStore(state => state.getEventsFromTo);
  const events = tasksCalendarStore(state => state.events);
  const isLoading = tasksCalendarStore(state => state.isLoading);

  const [isAOpenAddModal, setIsAOpenAddModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<CalendarEventItem | null>(null);
  const [view, setView] = useState<CalendarViewType>(Views.WEEK);
  const [date, setDate] = useState<Date>(moment()
    .toDate());

  const unixTimestamp: { start: Date, end: Date } = useMemo(() => {
    return {
      start: moment(date)
        .startOf(view as unitOfTime.StartOf)
        .toDate(),
      end: moment(date)
        .endOf(view as unitOfTime.StartOf)
        .toDate()
    };
  }, [view, date]);

  useEffect(() => {
    getEventsFromTo(unixTimestamp.start, unixTimestamp.end);
  }, [unixTimestamp]);

  return (
    <div className="CustomCalendar">
      <CalendarControl
        isLoading={isLoading}
        view={view}
        setView={setView}
        date={date}
        setDate={setDate}
        setIsOpenModal={setIsAOpenAddModal}
      />
      <EventsCalendar
        view={view}
        date={date}
        setSelectedTask={setSelectedTask}
        events={events}
      />
      <PreviewCalendarEventModal
        isOpen={!!selectedTask}
        onCancel={setSelectedTask.bind(null, null)}
        event={selectedTask}
        setIsAOpenAddModal={setIsAOpenAddModal.bind(null, true)}
      />
      <AddCalendarTaskModal
        isOpen={isAOpenAddModal}
        onCancel={setIsAOpenAddModal.bind(null, false)}
      />
    </div>
  );
};
