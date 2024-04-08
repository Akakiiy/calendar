import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type { CalendarEventItem, TasksStoreInitialValue } from "../../types";
import { sleep } from "../../../shared/ui/sleep";
import { fakedata } from "../../const/fakedata.ts";

export const tasksCalendarStore = create<TasksStoreInitialValue>()(immer((set, get) => ({
  isLoading: false,
  events: [...fakedata],
  eventForEdit: null,
  getEventsFromTo: async (from: Date, to: Date) => {
    // тут тупо эмулируем загрузку, потому что устал писать это чудо :D
    const eventsBackup = get().events;

    try {
      set({ isLoading: true });
      
      set({ events: [] });
      await sleep(600);

      console.log(`Типа летит запрос на бек 
      получить с ${from.toLocaleString()} 
      по ${to.toLocaleString()}`);

    } catch (err) {
      console.error(err);
    } finally {
      set({ isLoading: false });
      set({ events: eventsBackup });
    }
  },
  addEvent: async (event: CalendarEventItem) => {
    set((state) => ({
      events: [...state.events, {
        ...event,
        start: new Date(event.start),
        end: new Date(event.end)
      }]
    }));
  },
  setEventForEdit: (eventForEdit: CalendarEventItem | null) => {
    set({ eventForEdit });
  },
  editEvent: async (event: CalendarEventItem) => {
    set((state) => ({
      events: state.events.map((item: CalendarEventItem) => item.id === event.id
        ? {
          ...event,
          start: new Date(event.start),
          end: new Date(event.end)
        }
        : item)
    }));
  },
  editEventTime: async (editEventInfo: CalendarEventItem) => {
    //сначала создаем копию старого события, чтоб было к чему откатиться
    const oldEvent = get()
      .events
      .find(e => e.id === editEventInfo.id);
    const eventBackup = structuredClone(oldEvent);//глубокое копирование
    const newEvent = { ...eventBackup, ...editEventInfo };
    //сразу заменяем данные в state, и перемещаем событие
    set((state) => ({
      events: state.events.map((item: CalendarEventItem) => item.id === editEventInfo.id ? newEvent : item)
    }));

    console.log("newEvent", newEvent);

    try {
      await sleep(600);
    } catch (err) {
      set((state) => ({ //в случае ошибки на сервере, откатываем данные о времени назад по бекапам
        events: state.events.map((item: CalendarEventItem) => item.id === editEventInfo.id ? eventBackup : item)
      }));

      console.error(err);
    }
  },
  removeEvent: async (id: number) => {
    set((state) => ({
      events: state.events.filter((item: CalendarEventItem) => item.id !== id)
    }));
  }
})));
