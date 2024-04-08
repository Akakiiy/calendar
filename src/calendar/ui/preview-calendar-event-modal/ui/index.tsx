import "./index.scss";

import type { CalendarEventItem } from "../../../types";
import { tasksCalendarStore } from "../../../model";
import { Button, Modal } from "antd";
import { DeleteOption } from "../../../../shared/ui/delete-option";
import { ReactNode } from "react";

type PreviewCalendarTaskModalProps = {
  isOpen: boolean,
  onCancel: () => void,
  event: CalendarEventItem | null,
  setIsAOpenAddModal: () => void
}

export const PreviewCalendarEventModal = ({
                                            isOpen,
                                            onCancel,
                                            event,
                                            setIsAOpenAddModal
                                          }: PreviewCalendarTaskModalProps) => {
  const removeEvent = tasksCalendarStore(state => state.removeEvent);
  const setEventForEdit = tasksCalendarStore(state => state.setEventForEdit);

  const deleteItem = () => {
    removeEvent(event?.id!);
    onCancel();
  };

  const editItem = () => {
    setEventForEdit(event);
    setIsAOpenAddModal();
    onCancel();
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onCancel}
      footer={null}
    >
      <div className="PreviewCalendarTaskModal">
        <TaskModalRow arr={["Название задачи:", event?.name]} />
        <TaskModalRow
          arr={[
            "Цвет:",
            <div className="color_wrapper">
              <div>{event?.color}</div>
              <div className={"color"} style={{ backgroundColor: event?.color }} />
            </div>
          ]}
        />
        <TaskModalRow arr={["Срочность:", event?.urgency.title]} />
        <TaskModalRow arr={["Сложность:", event?.complexity.title]} />
        <TaskModalRow arr={["Время начала задачи:", event?.start.toLocaleString()]} />
        <TaskModalRow arr={["Время окончания задачи:", event?.end.toLocaleString()]} />
        <TaskModalRow
          arr={[
            "Описание:",
            event?.description
          ]}
        />
        <div className="PreviewCalendarTaskModal_buttons">
          <Button onClick={editItem}>
            Редактировать
          </Button>
          <DeleteOption onDelete={deleteItem}>
            <Button>
              Удалить
            </Button>
          </DeleteOption>
        </div>
      </div>
    </Modal>
  );
};

const TaskModalRow = ({ arr }: { arr: [string, (string | ReactNode | undefined)] }) => (
  <>
    {
      arr[1]
        ? (
          <div className="PreviewCalendarTaskModal_item">
            <span>
              {arr[0]}
            </span>
            {arr[1]}
          </div>
        )
        : null
    }
  </>
);
