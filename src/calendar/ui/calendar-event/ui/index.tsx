import "./index.scss";

import { getContrastColor } from "../../../../shared/lib/get-сontrast-сolor";

import type { CalendarEventItem } from "../../../types";

type CalendarEventProps = {
  event: CalendarEventItem
}

export const CalendarEvent = ({ event }: CalendarEventProps) => {
  return (
    <div
      className="CalendarEvent"
      style={{
        backgroundColor: event?.color,
        color: getContrastColor(event?.color)
      }}
    >
      <div>
        {event.name}
      </div>
    </div>
  );
};
