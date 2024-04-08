import "./SimpleSelect.scss";

import cn from "classnames";
import type { ReactNode } from "react";
import { memo, useEffect, useRef, useState } from "react";

type SimpleSelectProps = {
  label?: string,
  options: Array<{ value: any, label: string }>,
  initialValue: string,
  handleOnChange: (value: any) => void,
  optionRender?: (value: string | number | null) => ReactNode
}
export const SimpleSelect = memo(({
                                    label,
                                    options,
                                    initialValue,
                                    handleOnChange,
                                    optionRender
                                  }: SimpleSelectProps) => {
  const [selectedOption, setSelectedOption] = useState(initialValue);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const MAX_LENGTH = 17;
  /*
  * Функия для выбора нужного элемента
  * */
  const selectOption = (option: { value: string | number | null, label: string }) => {
    setSelectedOption(option.label);
    handleOnChange(option.value);
    setIsOpen(false);
  };

  /*
  * Функия для клика вне меню
  * */
  const handleClickOutside = (event: any) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="simple-select-wrapper">
      {
        label
          ? <div className="simple-select-label">
            {label.slice(0, MAX_LENGTH)}
          </div>
          : null
      }
      <div
        ref={wrapperRef}
        className={cn(
          "simple-select",
          { open: isOpen }
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="simple-select-selected-option">
          {selectedOption.slice(0, MAX_LENGTH)}
          <div className="arrow" />
        </div>
        {isOpen
          ? <div className="simple-options">
            {options.map((option, index) => (
              <div
                key={index}
                className="simple-option"
                onClick={() => selectOption(option)}
              >
                {
                  optionRender
                    ? optionRender(option.label.slice(0, MAX_LENGTH))
                    : option.label.slice(0, MAX_LENGTH)
                }
              </div>
            ))}
          </div>
          : null}
      </div>
    </div>
  );
});
