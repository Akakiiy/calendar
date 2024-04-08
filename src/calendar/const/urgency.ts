export const urgencyVars: Array<UrgencyVar> = [
  {
    id: 1,
    title: "Низкая"
  },
  {
    id: 2,
    title: "Средняя"
  },
  {
    id: 3,
    title: "Высокая"
  }
];

type UrgencyVar = { id: number, title: string }