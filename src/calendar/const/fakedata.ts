import moment from "moment";

import { colors } from "./colors.ts";
import { urgencyVars } from "./urgency.ts";
import { complexityVars } from "./complexity.ts";
import { CalendarEventItem } from "../types";

export const fakedata: CalendarEventItem[] = [
  {
    id: Math.random(),
    name: "Важная задача",
    start: moment().toDate(),
    end: moment().add("2", "hour").toDate(),
    color: colors[2],
    urgency: urgencyVars[1],
    complexity: complexityVars[2],
    description: "Какое то большое описание. Какое то большое описание. Какое то большое описание. Какое то большое описание. Какое то большое описание. Какое то большое описание. Какое то большое описание."
  },
  {
    id: Math.random(),
    name: "Задача На пару дней",
    start: moment().toDate(),
    end: moment().add("3", "days").toDate(),
    color: colors[1],
    urgency: urgencyVars[0],
    complexity: complexityVars[0],
    description: ""
  },
  {
    id: Math.random(),
    name: "Задача №3",
    start: moment().add("1", "days").toDate(),
    end: moment().add("6", "days").toDate(),
    color: colors[3],
    urgency: urgencyVars[2],
    complexity: complexityVars[1],
    description: ""
  }
];