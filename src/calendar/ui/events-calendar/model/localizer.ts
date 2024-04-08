import format from 'date-fns/format'
import getDay from 'date-fns/getDay'
import { ru } from 'date-fns/locale/ru'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import { dateFnsLocalizer } from 'react-big-calendar'

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { ru }
})
