import type { Views } from "react-big-calendar";
import { colors } from "../const/colors.ts";
import { urgencyVars } from "../const/urgency.ts";
import { complexityVars } from "../const/complexity.ts";

export type TasksStoreInitialValue = {
  isLoading: boolean
  events: CalendarEventItem[],
  eventForEdit: CalendarEventItem | null,
  setEventForEdit: (value: CalendarEventItem | null) => void,
  getEventsFromTo: (from: Date, to: Date) => void,
  addEvent: (data: CalendarEventItem) => void,
  editEvent: (data: CalendarEventItem) => void,
  editEventTime: (data: CalendarEventItem) => void,
  removeEvent: (id: number) => void,
}

export type CalendarViewType = (typeof Views)[keyof typeof Views]

export type CalendarEventItem = {
  id: number,
  name: string,
  start: Date,
  end: Date,
  description?: string,
  complexity: typeof complexityVars[number]
  urgency: typeof urgencyVars[number]
  color: typeof colors[number]
}
