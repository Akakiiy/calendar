import "./index.scss";

import { Button, DatePicker, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useFormik } from "formik";
import moment from "moment";
import { useEffect } from "react";
import { tasksCalendarStore } from "../../../model";
import { SimpleSelect } from "../../../../shared/ui/simple-select";
import { CalendarEventItem } from "../../../types";

import { colors } from "../../../const/colors.ts";
import { urgencyVars } from "../../../const/urgency.ts";
import { complexityVars } from "../../../const/complexity.ts";

type AddCalendarTaskModalProps = {
  isOpen: boolean,
  onCancel: () => void,
}

export const AddCalendarTaskModal = ({
                                       isOpen,
                                       onCancel
                                     }: AddCalendarTaskModalProps) => {
  const addEvent = tasksCalendarStore(state => state.addEvent);
  const editEvent = tasksCalendarStore(state => state.editEvent);
  const eventForEdit = tasksCalendarStore(state => state.eventForEdit);
  const setEventForEdit = tasksCalendarStore(state => state.setEventForEdit);

  const formik = useFormik({
    initialValues: {
      id: eventForEdit?.id || Math.random(),
      name: "",
      start: moment()
        .startOf("day")
        .toDate(),
      end: moment()
        .endOf("day")
        .toDate(),
      color: colors[0],
      urgency: urgencyVars[0],
      complexity: complexityVars[0],
      description: ""
    } as CalendarEventItem,
    onSubmit: (values) => {
      if (values.name.length < 2) {
        alert("Название не может быть меньше 2х символов");
        return;
      }

      if (eventForEdit !== null) {
        editEvent({
          ...values,
          id: eventForEdit.id,
          complexity: values.complexity,
          urgency: values.urgency,
          color: values.color,
          start: dayjs(values.start)
            .toDate(),
          end: dayjs(values.end)
            .toDate()
        });
      } else {
        addEvent({
          ...values,
          start: dayjs(values.start)
            .toDate(),
          end: dayjs(values.end)
            .toDate()
        });
      }

      closeHandler();
    }
  });

  useEffect(() => {
    if (eventForEdit) {
      formik.setFieldValue("name", eventForEdit.name);
      formik.setFieldValue("start", eventForEdit.start);
      formik.setFieldValue("end", eventForEdit.end);
      formik.setFieldValue("complexity", eventForEdit.complexity);
      formik.setFieldValue("urgency", eventForEdit.urgency);
      formik.setFieldValue("color", eventForEdit.color);
      formik.setFieldValue("description", eventForEdit.description);
    }
  }, [eventForEdit]);

  const onChangeRangePicker = (rangeValue: null | (dayjs.Dayjs | null)[]) => {
    if (rangeValue && rangeValue[0]) {
      formik.setFieldValue("start", rangeValue[0]);
    }
    if (rangeValue && rangeValue[1]) {
      formik.setFieldValue("end", rangeValue[1]);
    }
  };

  const closeHandler = () => {
    setEventForEdit(null);
    formik.resetForm();
    onCancel();
  };

  return (
    <Modal
      open={isOpen}
      onCancel={closeHandler}
      title={eventForEdit ? "Редактировать событие" : "Добавить событие"}
      footer={null}
    >
      <form className="AddCalendarTaskModal">
        <Input
          placeholder="Название"
          value={formik.values.name}
          onChange={(value) => formik.setFieldValue("name", value.target.value)}
        />
        <DatePicker.RangePicker
          showTime={{ format: "HH:mm" }}
          format="YYYY-MM-DD HH:mm"
          value={[dayjs(formik.values.start), dayjs(formik.values.end)]}
          onChange={onChangeRangePicker}
        />
        <div className="AddCalendarTaskModal_selectors">
          <SimpleSelect
            label="Цвет"
            options={colors.map(c => ({ label: c, value: c }))}
            initialValue={formik.values.color}
            handleOnChange={(value) => formik.setFieldValue("color", value)}
          />
          <SimpleSelect
            label="Длительность"
            options={complexityVars.map(c => ({ label: c.title, value: c }))}
            initialValue={formik.values.complexity.title}
            handleOnChange={(value) => formik.setFieldValue("complexity", value)}
          />
          <SimpleSelect
            label="Сложность"
            options={urgencyVars.map(c => ({ label: c.title, value: c }))}
            initialValue={formik.values.urgency.title}
            handleOnChange={(value) => formik.setFieldValue("urgency", value)}
          />
        </div>
        <TextArea
          placeholder="описание"
          autoSize={{
            minRows: 4,
            maxRows: 6
          }}
          value={formik.values.description}
          onChange={(value) => formik.setFieldValue("description", value.target.value)}
        />
      </form>
      <Button onClick={() => formik.handleSubmit()}>
        {eventForEdit ? "Сохранить" : "Создать"}
      </Button>
    </Modal>
  );
};
